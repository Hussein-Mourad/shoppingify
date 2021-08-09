import cn from "classnames"

interface Props  {
  children: React.ReactNode;
  center?:boolean;
};
function BackDrop({ children,center=false }: Props) {
const styles  =cn("fixed top-0 left-0 z-50 w-screen h-screen bg-black/20", {"flex justify-center items-center":center})
  return (
    <div className={styles}>
      {children}
    </div>
  );
}

export default BackDrop;
