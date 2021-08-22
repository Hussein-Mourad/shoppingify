import OneSideBarLayout from "features/layouts/OneSideBarLayout";
import useAuthentication from "hooks/useAuthentication";
import Head from "next/head";
import { CircularProgress } from "@material-ui/core";

export default function Home() {
  const { user, isLoading } = useAuthentication();

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-white">
        <CircularProgress classes={{ circle: "text-yellow-primary" }} />
      </div>
    );
  }

  return (
    <div className="">
      <OneSideBarLayout>
        <div className="min-h-screen p:2 sm:p-4 md:p-6">
          <h1 className="mb-3 text-2xl font-medium sm:mb-5">
            Shopping history
          </h1>
        </div>
      </OneSideBarLayout>
    </div>
  );
}
