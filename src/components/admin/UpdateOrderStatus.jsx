import { useContext} from "react";
import { doc, updateDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig.jsx"; // Adjust path as needed
import myContext from "../../context/myContext";
import toast from "react-hot-toast";

const UpdateOrderStatus = () => {
  const context = useContext(myContext);
  const { getAllOrder, orderDelete } = context;

  // Function to handle status change and update Firestore
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Update the status in Firestore
      const orderRef = doc(fireDB, "order", orderId);
      await updateDoc(orderRef, { status: newStatus });
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status: ", error);
      toast.error("Failed to update status.");
    }
  };

  return (
    <div>
      <div className="py-5 text-center">
        <h1 className="text-3xl text-gray-700 font-bold">All Orders</h1>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border border-collapse sm:border-separate border-orange-700 text-orange-900">
          <tbody>
            <tr>
              {/* Table Headers */}
              <th className="h-12 px-6 text-md border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 font-bold text-center">
                S.No.
              </th>
              <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
                Order Id
              </th>
              <th className="h-12 px-6 text-md border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 font-bold text-center">
                Image
              </th>
              <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
                Title
              </th>
              <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
                Category
              </th>
              <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
                Price
              </th>
              <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
               Quantity
              </th>
              <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
              Total Price
              </th>
              
              <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
                Status
              </th>
              <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
                Name
              </th>
              <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
                Address
              </th>
              <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
                Pincode
              </th>
              <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
               Mobile No.
              </th>
              <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
               Email
              </th>
              <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
               Date
              </th>
              <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
               Payment Id
              </th>
              <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-orange-700 text-slate-700 bg-slate-100 text-center">
                Remove
              </th>
            </tr>
            {getAllOrder.map((order, index) => (
              <tr key={order.id} className="text-orange-900">
                <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-orange-700 text-center">
                  {index + 1}
                </td>
                <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-orange-700 text-center">
                  {order.cartItems[0].id}
                </td>
                <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-orange-700 text-center">
                  <img src={order.cartItems[0].productImageUrl} alt="img" className="h-[50px]" />
                </td>
                <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-orange-700 text-center">
                     {order.cartItems[0].title} 
                </td>
                <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-orange-700 text-center">
                     {order.cartItems[0].category} 
                </td>
                <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-orange-700 text-center">
                    Rs.{order.cartItems[0].price} 
                </td>
                <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-orange-700 text-center">
                    {order.cartItems[0].quantity} 
                </td>
                <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-orange-700 text-center">
                   Rs.{order.cartItems[0].price * order.cartItems[0].quantity} 
                </td>
                

                <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-orange-700 text-center">
                  <select
                    className="border border-gray-400 rounded px-2 py-1"
                    value={order.status || "Processing"}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                  >
                    <option value="Processing">Processing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-orange-700 text-center">
                  {order.addressInfo.name}
                </td>
                <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-orange-700 text-center">
                  {order.addressInfo.address}
                </td>

                <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-orange-700 text-center">
                  {order.addressInfo.pincode}
                </td>
                <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-orange-700 text-center">
                  {order.addressInfo.mobileNumber}
                </td>
                <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-orange-700 text-center">
                  {order.email}
                </td>

                <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-orange-700 text-center">
                  {order.addressInfo.date}
                </td>
                <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-orange-700 text-center">
                  {order.paymentId}
                </td>

                <td
                  onClick={() => orderDelete(order.id)}
                  className="h-12 px-6 text-md border-t border-l first:border-l-0 border-orange-700 text-center cursor-pointer"
                >
                  <button className="bg-red-500 text-white px-4 rounded-md">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpdateOrderStatus;
