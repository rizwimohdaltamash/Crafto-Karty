import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const ProductDetails = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProduct, getAllProductFunction } = context;
    // console.log(getAllProduct)

    // navigate 
    const navigate = useNavigate();

    // Delete product 
    const deleteProduct = async (id) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'products', id))
            toast.success('Product Deleted successfully')
            getAllProductFunction();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="py-5 flex  lg:w-[40%] w-full justify-between items-center">
                {/* text  */}
                <h1 className=" text-2xl text-gray-700 font-bold">All Product</h1>
                {/* Add Product Button  */}
                <Link to={'/addproduct'}>
                    <button className="px-5 py-2 bg-orange-900 border hover:bg-orange-700 border-orange-100 rounded-lg text-white">Add Product</button>
                </Link>
            </div>

            {/* Loading  */}
            <div className="flex justify-center relative top-20">
                {loading && <Loader />}
            </div>

            {/* table  */}
            <div className="w-full overflow-x-auto mb-5">

                <table className="w-full text-left border border-collapse sm:border-separate border-orange-400 text-orange-900" >

                    <tbody>
                        <tr>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-orange-400 text-slate-700 bg-slate-100 font-bold fontPara text-center">S.No.</th>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-orange-400 text-slate-700 bg-slate-100 font-bold fontPara text-center">Image</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-orange-400 text-slate-700 bg-slate-100 text-center">Title</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-orange-400 text-slate-700 bg-slate-100 text-center">Price</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-orange-400 text-slate-700 bg-slate-100 text-center">Total Quantity</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-orange-400 text-slate-700 bg-slate-100 text-center">Category</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-orange-400 text-slate-700 bg-slate-100 text-center"> Date</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-orange-400 text-slate-700 bg-slate-100 text-center">Edit</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-orange-400 text-slate-700 bg-slate-100 text-center">Remove</th>
                        </tr>
                        {getAllProduct.map((item, index) => {
                            const { id, title, price, category, date, productImageUrl,totalQuantity } = item
                            return (
                                <tr key={index} className="text-orange-900">
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-400 stroke-slate-500 text-slate-500 text-center">
                                        {index + 1}.
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-400 stroke-slate-500 text-slate-500 first-letter:uppercase text-center">
                                        <div className="flex justify-center">
                                            <img className="w-20 " src={productImageUrl} alt="" />
                                        </div>
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-400 stroke-slate-500 text-slate-500 first-letter:uppercase  text-center">
                                        {title}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-400 stroke-slate-500 text-slate-500 first-letter:uppercase  text-center">
                                        ₹{price}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-400 stroke-slate-500 text-slate-500 first-letter:uppercase  text-center">
                                        {totalQuantity}
                                    </td>
                                   
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-400 stroke-slate-500 text-slate-500 first-letter:uppercase  text-center">
                                        {category}
                                    </td>
                                    <td className=" h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-400 stroke-slate-500 text-slate-500 first-letter:uppercase text-center">
                                        {date}
                                    </td>
                                    <td onClick={()=> navigate(`/updateproduct/${id}`)} className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-400 stroke-slate-500 text-slate-500 text-center  cursor-pointer ">
                                        <button className="bg-green-500 text-white px-4 rounded-md" >Update</button>
                                       
                                    </td>
                                    <td onClick={()=> deleteProduct(id)} className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-400 stroke-slate-500 text-slate-500 text-center cursor-pointer ">
                                    <button className="bg-red-500 text-white px-4 rounded-md" > Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductDetails;