import MenuCategoryNav from "@/components/menu/MenuCategoryNav";
import MenuList from "@/components/menu/MenuList";
import Btn from "@/utils/Btn";

const page = () => {
  return (
    <div>
      {/* category Nav */}
      <MenuCategoryNav/>
      <div className=" px-4 w-full py-3 my-4 bg-transparent  flex items-center gap-5  font-bold  border-b-2 border-gray-500  text-gray-700 dark:text-white/80">
        <Btn
          path="/menu/veg"
          title={"Veg Menu"}
          style={"hover:text-orange-500"}
        />
        <Btn
          path="/menu/non-veg"
          title="Non-veg Menu"
          style={"hover:text-orange-500"}
        />
        <Btn
          path="/menu/all-items"
          title="View All Menu"
          style={"hover:text-orange-500"}
        />
      </div>
      {/* MenuList component */}
      <div>
        <MenuList/>
      </div>
    </div>
  );
};

export default page;
