import { useEffect, useState } from "react";
import OneSideBarLayout from "features/layouts/OneSideBarLayout";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import axios from "axios";
import IShoppingList, { IShoppingListItem } from "types/ShoppingList";
import ICategory from "types/Category";
import { CircularProgress } from "@material-ui/core";

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

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/shoppinglists/stats/");
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
        const response = await axios.get("/api/shoppinglists/");
        let {shoppingLists} = response.data;
        shoppingLists.forEach((shoppingList: any) => {
          shoppingList.createdAt = new Date(shoppingList.createdAt);
        });
        setChartData(shoppingLists);
      } catch (error) {
        if (error.response?.data?.error?.message)
          setError(error.response.data.error.message);
          else
          setError("Failed to get data. Check your connection and try again");
        }
        setIsLoading(false);
    })();

    return () => {};
  }, []);

  if (isLoading)
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
      {!error && (
        <div className="pt-5">
          {/* <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
          <h2 className="text-2xl font-semibold text-gray-800">Top items</h2>
          </div>
          <div></div>
          </div>
          <LineChart width={1000} height={300} data={chartData}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
        </LineChart> */}
        </div>
      )}
    </OneSideBarLayout>
  );
}
