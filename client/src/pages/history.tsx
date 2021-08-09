import ItemDetails from "components/ItemDetails";
import Layout from "components/shared/Layout";
import Head from "next/head";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href={"/favicon.ico"} />
      </Head>
      <Layout
        sideDrawer={
          <ItemDetails
            item={{
              name: "Avocado",
              category: "Fruit and Vegetables",
              note:
                "Lorem ipsum dolor sit amet, consectet ur adipisicing elit. Ex, quidemlaceat, neque   error soluta cum maiores optio numquam. Doloremque incidunt animi eos et  plaeat! Molestias ipsum, voluptatem ullam repellat quibusdam labore  nesciunt praesentium, a enim illo deleniti, commodi mollitia accusan",
            }}
            onDelete={() => {}}
            onClose={() => {}}
            onAddToList={() => {}}
          />
        }
      >
        <div className="min-h-screen p:2 sm:p-4 md:p-6">
          <h1 className="mb-3 text-2xl font-medium sm:mb-5">
            Shopping history
          </h1>
        </div>
      </Layout>
    </div>
  );
}