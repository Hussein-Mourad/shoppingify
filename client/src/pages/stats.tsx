import { useEffect, useState } from "react";
import OneSideBarLayout from "features/layouts/OneSideBarLayout";
import axios from "axios";
import IShoppingList, { IShoppingListItem } from "types/ShoppingList";
import ICategory from "types/Category";
import { CircularProgress } from "@material-ui/core";
import Progress from "components/shared/Progress";
import useAuthentication from "hooks/useAuthentication";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface IResponse {
  products: IShoppingListItem[];
  categories: ICategory[];
}

export default function StatsPage() {
  const [data, setData] = useState<IResponse | null>(null);
  const [chartData, setChartData] = useState<IShoppingList[] | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const { isLoading: isAuthenticating } = useAuthentication();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "/api/shoppinglists/stats/top_products"
        );
        setData(response.data);
      } catch (error) {
        if (error.response?.data?.error?.message)
          setError(error.response.data.error.message);
        else
          setError("Failed to get data. Check your connection and try again");
      }
    })();

    (async () => {
      try {
        const response = await axios.get("/api/shoppinglists/stats/chart");
        setChartData(response.data.stats);
      } catch (error) {
        if (error.response?.data?.error?.message)
          setError(error.response.data.error.message);
        else
          setError("Failed to get data. Check your connection and try again");
      }
      setIsLoading(false);
    })();

    return () => {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || isAuthenticating)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <CircularProgress classes={{ circle: "text-yellow-primary" }} />
      </div>
    );

  return (
    <OneSideBarLayout>
      {error && (
        <div className="flex items-center justify-center w-full h-screen">
          <p className="text-sm text-red-500/90">{error}</p>
        </div>
      )}
      {!error && data && chartData && (
        <div className="px-3 pt-5">
          <div className="grid grid-cols-1 gap-5 mb-10 md:grid-cols-2">
            <div>
              <h2 className="mb-3 text-2xl font-semibold text-gray-800">
                Top items
              </h2>
              <div className="w-5/6">
                {data.products.map((product: any) => (
                  <Progress
                    className="mb-5"
                    progressColor="bg-yellow-primary"
                    percentage={product.percentage}
                    key={product._id}
                    text={product.name}
                  />
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-3 text-2xl font-semibold text-gray-800">
                Top categories
              </h2>
              <div className="w-5/6">
                {data.categories.map((category: any) => (
                  <Progress
                    className="mb-5"
                    progressColor="bg-lightBlue-500"
                    percentage={category.percentage}
                    key={category._id}
                    text={category.name}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:pr-16">
            <h2 className="mb-3 text-2xl font-semibold text-gray-800">
              Monthly Summary
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData} margin={{ left: -30 }}>
                <Line
                  name="items"
                  type="monotone"
                  dataKey="products"
                  stroke="#8884d8"
                />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="bottom" height={24} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </OneSideBarLayout>
  );
}
