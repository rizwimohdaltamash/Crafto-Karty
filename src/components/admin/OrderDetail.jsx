import { useContext } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig.jsx"; // Adjust path as needed
import myContext from "../../context/myContext";

const OrderDetail = () => {
    const context = useContext(myContext);
    const { getAllOrder, orderDelete } = context;
    // console.log(getAllOrder)

    return (
        <div>
            <div>
                <div className="py-5 text-center">
                    {/* text  */}
                    <h1 className=" text-3xl text-gray-700 font-bold">All Orders</h1>
                </div>

                {/* table  */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border border-collapse sm:border-separate border-orange-700 text-orange-900" >
                        <tbody  >
                            <tr>
                                <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 font-bold fontPara text-center">
                                    S.No.
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
                                    Order Id
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
                                    Image
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
                                    Title
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
                                    Category
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
                                    Price
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
                                    Quantity
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
                                    Total Price
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
                                    Status
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
                                    Name
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
                                    Address
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
                                    Pincode
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
                                    Phone Number
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
                                    Email
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
                                    Date
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
                                    Remove
                                </th>


                            </tr>
                            
                           
                            {getAllOrder.map((order) => {
                                console.log(order)
                                return (
                                    <>
                                        {order.cartItems.map((item, index) => {
                                            const { id, productImageUrl, title, category, price, quantity } = item
                                            return (
                                                <tr key={index} className="text-orange-900">
                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-700 stroke-slate-500 text-slate-500 text-center">
                                                        {index + 1}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-700 stroke-slate-500 text-slate-500 text-center">
                                                        {id}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-700 stroke-slate-500 text-slate-500 first-letter:uppercase text-center">
                                                        <img src={productImageUrl} alt="img" />
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-700 stroke-slate-500 text-slate-500 first-letter:uppercase text-center">
                                                        {title}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-700 stroke-slate-500 text-slate-500 first-letter:uppercase text-center">
                                                        {category}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-700 stroke-slate-500 text-slate-500 first-letter:uppercase text-center">
                                                        ₹{price}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-700 stroke-slate-500 text-slate-500 first-letter:uppercase text-center">
                                                        {quantity}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-700 stroke-slate-500 text-slate-500 first-letter:uppercase text-center">
                                                        ₹{price * quantity}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l text-green-600  first:border-l-0 border-orange-700 stroke-slate-500 text-slate-500 first-letter:uppercase text-center">
                                                         {order.status} 
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-700 stroke-slate-500 text-slate-500 first-letter:uppercase text-center">
                                                        {order.addressInfo.name}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-700 stroke-slate-500 text-slate-500 first-letter:uppercase text-center">
                                                        {order.addressInfo.address}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-700 stroke-slate-500 text-slate-500 first-letter:uppercase text-center">
                                                        {order.addressInfo.pincode}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-700 stroke-slate-500 text-slate-500 first-letter:uppercase text-center">
                                                        {order.addressInfo.mobileNumber}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-700 stroke-slate-500 text-slate-500 text-center">
                                                        {order.email}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-700 stroke-slate-500 text-slate-500 first-letter:uppercase text-center">
                                                        {order.date}
                                                    </td>

                                                    <td onClick={()=> orderDelete(order.id)} className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-700 stroke-slate-500 text-slate-500 cursor-pointer text-center">
                                                     
                                                        <button className="bg-red-500 text-white px-4 rounded-md" > Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                )
                            })}


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;

