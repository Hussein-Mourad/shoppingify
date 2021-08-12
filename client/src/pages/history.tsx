import OneSideBarLayout from "components/layouts/OneSideBarLayout";
import Head from "next/head";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href={"/favicon.ico"} />
      </Head>
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
