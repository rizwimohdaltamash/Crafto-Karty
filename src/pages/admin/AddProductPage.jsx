// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { collection, addDoc, Timestamp } from "firebase/firestore";
// import { fireDB, storage } from "../../firebase/FirebaseConfig";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import myContext from "../../context/myContext";
// import Loader from "../../components/loader/Loader";
// import { toast } from "react-hot-toast";

// const categoryList = [
//     { name: "product" },
//     { name: "shirt" },
//     { name: "jacket" },
//     { name: "mobile" },
//     { name: "laptop" },
//     { name: "shoes" },
// ];

// const AddProductPage = () => {
//     const context = useContext(myContext);
//     const { loading, setLoading } = context;

//     const navigate = useNavigate();

//     const [product, setProduct] = useState({
//         title: "",
//         price: "",
//         productImageUrl: "",
//         category: "",
//         description: "",
//         totalQuantity: "",
//         quantity: 1,
//         time: Timestamp.now(),
//         date: new Date().toLocaleString("en-US", {
//             month: "short",
//             day: "2-digit",
//             year: "numeric",
//         }),
//     });

//     const [imageFile, setImageFile] = useState(null);

//     const handleImageUpload = async () => {
//         if (!imageFile) {
//             toast.error("Please upload an image.");
//             return null;
//         }
//         try {
//             const storageRef = ref(storage, `product-images/${imageFile.name}`);
//             await uploadBytes(storageRef, imageFile);
//             const imageUrl = await getDownloadURL(storageRef);
//             return imageUrl;
//         } catch (error) {
//             console.error("Image upload failed:", error);
//             toast.error("Failed to upload image.");
//             return null;
//         }
//     };

//     const addProductFunction = async () => {
//         if (
//             product.title === "" ||
//             product.price === "" ||
//             product.category === "" ||
//             product.description === "" ||
//             product.totalQuantity === ""
//         ) {
//             return toast.error("All fields are required");
//         }

//         setLoading(true);
//         try {
//             const imageUrl = await handleImageUpload();
//             if (!imageUrl) {
//                 setLoading(false);
//                 return;
//             }

//             const productRef = collection(fireDB, "products");
//             await addDoc(productRef, { 
//                 ...product, 
//                 productImageUrl: imageUrl,
//                 quantity: 1 // Ensure static quantity value
//                  });
//             toast.success("Product added successfully!");
//             navigate("/admin-dashboard");
//         } catch (error) {
//             console.error("Error adding product:", error);
//             toast.error("Failed to add product");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <div className="flex justify-center items-center h-screen">
//                 {loading && <Loader />}
//                 <div className="login_Form bg-black px-8 py-6 border rounded-xl shadow-md w-[90%] lg:w-[30%]">
//                     <div className="mb-5">
//                         <h2 className="text-center text-2xl font-bold text-orange-900">
//                             Add Product
//                         </h2>
//                     </div>

//                     {/* Product Title */}
//                     <div className="mb-3">
//                         <input
//                             type="text"
//                             name="title"
//                             value={product.title}
//                             onChange={(e) =>
//                                 setProduct({ ...product, title: e.target.value })
//                             }
//                             placeholder="Product Title"
//                             className="bg-gray-700 text-white px-2 py-2 w-full rounded-md outline-none placeholder-white"
//                         />
//                     </div>

//                     {/* Product Price */}
//                     <div className="mb-3">
//                         <input
//                             type="number"
//                             name="price"
//                             value={product.price}
//                             onChange={(e) =>
//                                 setProduct({ ...product, price: e.target.value })
//                             }
//                             placeholder="Product Price"
//                             className="bg-gray-700 text-white px-2 py-2 w-full rounded-md outline-none placeholder-white"
//                         />
//                     </div>

//                     {/* Product Image Upload */}
//                     <div className="mb-3">
//                         <input
//                             type="file"
//                             accept="image/*"
//                             onChange={(e) => setImageFile(e.target.files[0])}
//                             className="bg-gray-700 text-white px-2 py-2 w-full rounded-md outline-none"
//                         />
//                     </div>

//                     {/* Product Category */}
//                     <div className="mb-3">
//                         <select
//                             value={product.category}
//                             onChange={(e) =>
//                                 setProduct({ ...product, category: e.target.value })
//                             }
//                             className="w-full px-1 py-2 bg-gray-700 text-white rounded-md outline-none"
//                         >
//                             {categoryList.map((value, index) => (
//                                 <option
//                                     className="first-letter:uppercase"
//                                     key={index}
//                                     value={value.name}
//                                 >
//                                     {value.name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Product Description */}
//                     <div className="mb-3">
//                         <textarea
//                             value={product.description}
//                             onChange={(e) =>
//                                 setProduct({ ...product, description: e.target.value })
//                             }
//                             name="description"
//                             placeholder="Product Description"
//                             rows="5"
//                             className="w-full px-2 py-1 bg-gray-700 text-white rounded-md outline-none placeholder-white"
//                         ></textarea>
//                     </div>

//                     {/* Total Quantity */}
//                     <div className="mb-3">
//                         <input
//                             type="number"
//                             name="totalQuantity"
//                             value={product.totalQuantity}
//                             onChange={(e) =>
//                                 setProduct({ ...product, totalQuantity: e.target.value })
//                             }
//                             placeholder="Total Quantity"
//                             className="bg-gray-700 text-white px-2 py-2 w-full rounded-md outline-none placeholder-white"
//                         />
//                     </div>

//                     {/* Add Product Button */}
//                     <div className="mb-3">
//                         <button
//                             onClick={addProductFunction}
//                             type="button"
//                             className="bg-orange-900 hover:bg-orange-800 w-full text-white text-center py-2 font-bold rounded-md"
//                         >
//                             Add Product
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddProductPage;

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { fireDB, storage } from "../../firebase/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { toast } from "react-hot-toast";

const categoryList = [
    { name: "product" },
    { name: "shirt" },
    { name: "jacket" },
    { name: "mobile" },
    { name: "laptop" },
    { name: "shoes" },
];

const AddProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: [],
        category: "",
        description: "",
        totalQuantity: "",
        quantity: 1,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }),
    });

    const [imageFiles, setImageFiles] = useState([null, null, null, null]);

    const handleImageUpload = async () => {
        try {
            const uploadedUrls = await Promise.all(imageFiles.map(async (file) => {
                if (!file) return null;
                const storageRef = ref(storage, `product-images/${file.name}`);
                await uploadBytes(storageRef, file);
                return await getDownloadURL(storageRef);
            }));
            return uploadedUrls.filter(url => url !== null);
        } catch (error) {
            console.error("Image upload failed:", error);
            toast.error("Failed to upload images.");
            return [];
        }
    };

    const addProductFunction = async () => {
        if (
            product.title === "" ||
            product.price === "" ||
            product.category === "" ||
            product.description === "" ||
            product.totalQuantity === ""
        ) {
            return toast.error("All fields are required");
        }

        setLoading(true);
        try {
            const imageUrls = await handleImageUpload();
            if (imageUrls.length === 0) {
                setLoading(false);
                return;
            }

            const productRef = collection(fireDB, "products");
            await addDoc(productRef, { 
                ...product, 
                productImageUrl: imageUrls,
                quantity: 1 
            });
            toast.success("Product added successfully!");
            navigate("/admin-dashboard");
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error("Failed to add product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-center items-center h-screen">
                {loading && <Loader />}
                <div className="login_Form bg-black px-8 py-6 border rounded-xl shadow-md w-[90%] lg:w-[30%]">
                    <div className="mb-5">
                        <h2 className="text-center text-2xl font-bold text-orange-900">
                            Add Product
                        </h2>
                    </div>

                    {/* Product Title */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={(e) =>
                                setProduct({ ...product, title: e.target.value })
                            }
                            placeholder="Product Title"
                            className="bg-gray-700 text-white px-2 py-2 w-full rounded-md outline-none placeholder-white"
                        />
                    </div>

                    {/* Product Price */}
                    <div className="mb-3">
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={(e) =>
                                setProduct({ ...product, price: e.target.value })
                            }
                            placeholder="Product Price"
                            className="bg-gray-700 text-white px-2 py-2 w-full rounded-md outline-none placeholder-white"
                        />
                    </div>

                    {/* Product Description */}
                    <div className="mb-3">
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={(e) =>
                                setProduct({ ...product, description: e.target.value })
                            }
                            placeholder="Product Description"
                            className="bg-gray-700 text-white px-2 py-2 w-full rounded-md outline-none placeholder-white"
                        />
                    </div>

                    {/* Total Quantity */}
                    <div className="mb-3">
                        <input
                            type="number"
                            name="totalQuantity"
                            value={product.totalQuantity}
                            onChange={(e) =>
                                setProduct({ ...product, totalQuantity: e.target.value })
                            }
                            placeholder="Total Quantity"
                            className="bg-gray-700 text-white px-2 py-2 w-full rounded-md outline-none placeholder-white"
                        />
                    </div>

                    {/* Product Image Upload */}
                    {[0, 1, 2, 3].map(index => (
                        <div className="mb-3" key={index}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const files = [...imageFiles];
                                    files[index] = e.target.files[0];
                                    setImageFiles(files);
                                }}
                                className="bg-gray-700 text-white px-2 py-2 w-full rounded-md outline-none"
                            />
                        </div>
                    ))}

                    {/* Product Category */}
                    <div className="mb-3">
                        <select
                            value={product.category}
                            onChange={(e) =>
                                setProduct({ ...product, category: e.target.value })
                            }
                            className="w-full px-1 py-2 bg-gray-700 text-white rounded-md outline-none"
                        >
                            {categoryList.map((value, index) => (
                                <option
                                    className="first-letter:uppercase"
                                    key={index}
                                    value={value.name}
                                >
                                    {value.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Add Product Button */}
                    <div className="mb-3">
                        <button
                            onClick={addProductFunction}
                            type="button"
                            className="bg-orange-900 hover:bg-orange-800 w-full text-white text-center py-2 font-bold rounded-md"
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProductPage;
