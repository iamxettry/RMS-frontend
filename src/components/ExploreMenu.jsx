import Image from "next/image";
import { ceviche, cupcake} from "../../public/assets";
import Button from "./Button";
import Backlight from "./Backlight";

const ExploreMenu = () => {
  return (
    <div className="md:flex justify-between items-center relative shadow-md rounded-md">
      <div className="flex-1 w-full p-2 absolute md:relative z-0 flex justify-center items-center h-full ">
        <Image
          src={ceviche}
          priority
          alt="Ceviche"
          height="auto"
          width="auto"
          className="opacity-25 md:opacity-100 hidden md:flex "
        />
        <Image
          src={cupcake}
          priority
          alt="Cupcake"
          height="auto"
          width="auto"
          className="opacity-25 md:opacity-100  md:hidden "
        />
        <Backlight  style={"w-60 h-60 bg-gradient-to-r from-blue-200 to-pink-200 -z-10 md:blur-[100px] blur-[200px] rounded-full "}/>
      </div>
      <div className="flex-1 p-5 relative z-10 ">
        <div className="text-center ">
          <h1 className="py-2 text-4xl font-bold text-black text-opacity-80 dark:text-white">
            Welcome
          </h1>
          <h2 className="w-12 h-[3px] inline-block  bg-black bg-opacity-80 dark:bg-white "></h2>
        </div>
        <div className=" w-full py-2 ">
          <h2 className=" uppercase text-pretty text-center font-bold text-black text-opacity-50 dark:text-gray-200">
            Quality is at heart of everything we do
          </h2>
        </div>
        <div className="w-full py-3">
          <p className="text-black text-opacity-50 text-justify font-semibold -tracking-tighter dark:text-gray-300">
            Our daily changing menu represents the best of what our local
            markets have to offer. Our passion for sourcing fresh ingredients
            from farmers and suppliers we know, combining with traditional
            flavors and rewriting familiar recipes into exceptional cuisine is
            our mission and greatest joy.
          </p>
        </div>
        <div>
            <Button path="/menu" title="Explore Menu" hideplus={"hidden"} />
        </div>
      </div>
    </div>
  );
};

export default ExploreMenu;
