import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { CgProfile } from "react-icons/cg";

const UserDashboard = () => {
  // user
  const user = JSON.parse(localStorage.getItem("users"));

  const context = useContext(myContext);
  const { loading, getAllOrder } = context;
  // console.log(getAllOrder)

  // console.log(user)
  return (
    <Layout>
      <div className=" container mx-auto px-4 py-5 lg:py-8">
        {/* Top  */}
        <div className="top">
          {/* main  */}
          <div className=" bg-gray-900 text-white py-5 rounded-xl border border-gray-600 flex flex-col justify-center items-center">
            {/* image  */}
            <div className="flex justify-center">
              <CgProfile size={92} />
            </div>
            {/* text  */}
            <div className="  w-full flex flex-col justify-center items-center">
              {/* Name  */}
              <h1 className="  text-lg">
                <span className="text-orange-800 font-bold">Name : </span>
                {user?.name}
              </h1>

              {/* Email  */}
              <h1 className="  text-lg">
                <span className="text-orange-800 font-bold">Email : </span>
                {user?.email}
              </h1>

              {/* Date  */}
              <h1 className="  text-lg">
                <span className="text-orange-800 font-bold">Date : </span>
                {user?.date}
              </h1>

              {/* Role  */}
              <h1 className="  text-lg">
                <span className="text-orange-800 font-bold">Role : </span>
                {user?.role}
              </h1>
            </div>
          </div>
        </div>

        {/* bottom  */}
        <div className="bottom">
          {/* main 1 */}
          <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
            {/* text  */}
            <h2 className=" text-2xl lg:text-3xl font-bold text-center">
              Order Details
            </h2>

            <div className="flex justify-center relative top-10">
              {loading && <Loader />}
            </div>

            {/* main 2 */}
            {getAllOrder
              .filter((obj) => obj.userid === user?.uid)
              .map((order, index) => {
                // console.log(order);
                return (
                  <div key={index}>
                    {order.cartItems.map((item, index) => {
                      // console.log('item', item);
                      const {
                        id,
                        date,
                        quantity,
                        price,
                        title,
                        productImageUrl,
                        category,
                      } = item;
                      // console.log('order', order)
                      const { status } = order;
                      return (
                        <div
                          key={index}
                          className="mt-5 flex flex-col overflow-hidden rounded-xl border border-gray-300 md:flex-row"
                        >
                          {/* main 3  */}
                          <div className="w-full border-r border-gray-200 text-white bg-gray-900 md:max-w-xs">
                            {/* left  */}
                            <div className="p-8">
                              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                                <div className="mb-4">
                                  <div className="text-sm font-semibold text-orange-900">
                                    Order Id
                                  </div>
                                  <div className="text-sm font-medium break-words lg:px-0 px-1">
                                    #{id}
                                  </div>
                                </div>

                                <div className="mb-4">
                                  <div className="text-sm font-semibold text-orange-900">
                                    Date
                                  </div>
                                  <div className="text-sm font-medium ">
                                    {date}
                                  </div>
                                </div>

                                <div className="mb-4">
                                  <div className="text-sm font-semibold text-orange-900">
                                    Total Amount
                                  </div>
                                  <div className="text-sm font-medium ">
                                    ₹ {price * quantity}
                                  </div>
                                </div>

                                <div className="mb-4">
                                  <div className="text-sm font-semibold text-orange-900">
                                    Order Status
                                  </div>

                                  <div
                                    className={`text-lg font-bold first-letter:uppercase ${
                                        status === "Processing" 
                                        ? "text-gray-700" 
                                        : status === "Out for Delivery" 
                                        ? "text-yellow-700" 
                                        : status === "Delivered" 
                                        ? "text-green-700" 
                                        : status === "Cancelled" 
                                        ? "text-red-700" 
                                        : "text-gray-600" // Default case
                                    }`}
                                  >
                                    {status}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* right  */}
                          <div className="flex-1">
                            <div className="p-8">
                              <ul className="-my-7 divide-y divide-gray-200">
                                <li className="flex flex-col justify-between space-x-5 py-7 md:flex-row">
                                  <div className="flex flex-1 items-stretch">
                                    <div className="flex-shrink-0">
                                      <img
                                        className="h-40 w-40 rounded-lg border border-gray-200 object-contain"
                                        src={productImageUrl}
                                        alt="img"
                                      />
                                    </div>

                                    <div className="ml-5 flex flex-col justify-between">
                                      <div className="flex-1">
                                        <p className="text-sm font-bold text-gray-900">
                                          {title}
                                        </p>
                                        <p className="mt-1.5 text-sm font-medium text-gray-500">
                                          {category}
                                        </p>
                                      </div>

                                      <p className="mt-4 text-sm font-medium text-gray-500">
                                        x {quantity}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="ml-auto flex flex-col items-end justify-between">
                                    <p className="text-right text-sm font-bold text-gray-900">
                                      ₹ {price}
                                    </p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
