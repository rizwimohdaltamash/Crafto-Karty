import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import Loader from "../../components/loader/Loader";

// import { doc, updateDoc, getDoc } from "firebase/firestore";
// import { fireDB } from "../../firebase/FirebaseConfig";

const AllProduct = () => {
  const storedUser = localStorage.getItem("users");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Use user-specific keys
  const userPrefix = user ? `${user.uid}_` : "";

  const navigate = useNavigate();

  const context = useContext(myContext);
  const { loading, getAllProduct } = context;

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // const updateTotalQuantity = async (id, operation) => {
  //     try {
  //         const productRef = doc(fireDB, "products", id);
  //         const productSnap = await getDoc(productRef);

  //         if (productSnap.exists()) {
  //             const currentQuantity = productSnap.data().totalQuantity;

  //             // Perform the operation (add or subtract)
  //             const updatedQuantity = operation === "decrement"
  //                 ? currentQuantity - 1
  //                 : currentQuantity + 1;

  //             // Update the quantity in the database
  //             await updateDoc(productRef, { totalQuantity: updatedQuantity });
  //         } else {
  //             toast.error("Product not found in the database!");
  //         }
  //     } catch (error) {
  //         console.error("Error updating totalQuantity:", error);
  //         toast.error("Failed to update product quantity!");
  //     }
  // };

  const addCart = (item) => {
    // console.log(item)
    dispatch(addToCart(item));
    // updateTotalQuantity(item.id, "decrement"); // Reduce totalQuantity by 1
    toast.success("Add to cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    // updateTotalQuantity(item.id, "increment"); // Increase totalQuantity by 1
    toast.success("Delete cart");
  };

  // console.log(cartItems)

  // useEffect(() => {
  //     localStorage.setItem(`${userPrefix}cart`, JSON.stringify(cartItems));
  // }, [cartItems])
  useEffect(() => {
    if (user) {
      localStorage.setItem(`${userPrefix}cart`, JSON.stringify(cartItems));
    }
  }, [cartItems, userPrefix, user]);

  return (
    <Layout>
      <div className="py-8">
        {/* Heading  */}
        <div className="">
          <h1 className=" text-center mb-5 text-2xl font-semibold">
            All Products
          </h1>
        </div>

        {/* main  */}
        <section className="text-gray-600 body-font">
          <div className="container px-5 lg:px-0 py-5 mx-auto">
            <div className="flex justify-center">{loading && <Loader />}</div>
            <div className="flex flex-wrap -m-4">
              {getAllProduct.map((item, index) => {
                const { id, title, price, productImageUrl, totalQuantity } =
                  item;
                return (
                  <div key={index} className="p-1 w-2/4 md:w-1/4 lg:w-1/4">
                    <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                      <img
                        onClick={() => navigate(`/productinfo/${id}`)}
                        className="h-32 md:h-60 lg:h-60 w-full"
                        src={productImageUrl[0]}
                        alt="blog"
                      />
                      <div className="p-4">
                        
                        <h1 className="title-font flex text-xl font-bold text-gray-900 mb-3">
                          {title}
                        </h1>

                        <div className="flex flex-row gap-x-8 md:gap-x-36 lg:gap-x-36">
                      <h1 className=" title-font text-md font-semibold text-gray-900 mb-3">
                        ₹ {price}    
                      </h1>

                      <p className="ml-2 text-gray-500">
                   {totalQuantity < 10 ? `only ${totalQuantity} left` : ""}
                     </p>
                      </div>

                        <div className="flex justify-center ">
                          {cartItems.some((p) => p.id === item.id) ? (
                            <button
                              onClick={() => deleteCart(item)}
                              className=" bg-orange-900 hover:bg-orange-800 w-full text-white py-[4px] rounded-lg font-bold"
                            >
                              Delete From Cart
                            </button>
                          ) : (
                            <button
                              onClick={() => addCart(item)}
                              className=" bg-orange-900 hover:bg-orange-800 w-full text-white py-[4px] rounded-lg font-bold"
                            >
                              Add To Cart
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AllProduct;
