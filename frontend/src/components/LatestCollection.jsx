import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const LatestCollection = () => {
  const { products } = useContext(ShopContext); // Access the products from the ShopContext (API)
    const [latestProducts, setLatestProducts] = useState([]); // State to store the 10 latest products

    useEffect(() => {
            setLatestProducts(products.slice(0,10));
    },[]);


  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
        </p>
      </div>
{/* get 10 latest products from API */}
    

    </div>
  );
};

export default LatestCollection;
