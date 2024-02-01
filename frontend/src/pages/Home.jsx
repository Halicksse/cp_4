import { useNavigate } from "react-router-dom";
import couch from "../assets/img2.jpeg";

export default function Home() {
  const navigate = useNavigate();
  const handleExploreProducts = () => {
    navigate("/products");
  };

  return (
    <div className="h-screen flex flex-col md:flex-row justify-center items-center">
      <div className="md:w-1/2 flex flex-col  p-8">
        <h1 className="lg:text-5xl text-center md:text-left lg:mb-4 sm:mb-1 sm:text-2xl ">
          Welcome
        </h1>
        <p className="lg:text-3xl text-center md:text-left sm:text-xl">
          Begin a beautiful journey
        </p>
        <button
          type="button"
          onClick={handleExploreProducts}
          className=" border bg-stone-200 shadow-sm text-grey rounded-md lg:w-1/2 lg:mx-auto lg:mt-4 sm:w-full sm:mt-2 sm:mx-auto"
        >
          Explore Our Products
        </button>
      </div>
      <img src={couch} alt="couch" className="lg:w-2/5 h-full sm:w-full " />
    </div>
  );
}
