import SideBar from "components/SideBar";

interface Props  {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {

  return (
    <div className="w-full min-h-screen">
      <SideBar sideDrawerHandler={()=>{}} shoppingListButtonDisabled />
      <main className="px-5 ml-14 sm:ml-20 bg-gray-50 min-h-screen">{children}</main>
    </div>
  );
}
