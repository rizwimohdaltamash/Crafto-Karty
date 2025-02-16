// import { useContext, useState } from "react";
// import myContext from "../../context/myContext";
// import { useNavigate } from "react-router";
// import { IoSearch } from "react-icons/io5";

// const SearchBar = () => {
//     const context = useContext(myContext);
//     const { getAllProduct } = context
//     // Search State 
//     const [search, setSearch] = useState("");

//     // Filter Search Data
//     const filterSearchData = getAllProduct.filter((obj) => obj.title.toLowerCase().includes(search.toLowerCase())).slice(0, 8)

//     const navigate = useNavigate();

//     return (
//         <div className="">
//             {/* search input  */}
//             <div className=" relative input flex justify-center items-center">
//             <IoSearch size={24} className="absolute left-3 md:left-0 lg:left-32 text-gray-700"/>
//                 <input
//                     type="text"
//                     placeholder='Search here'
//                     onChange={(e) => setSearch(e.target.value)}
//                     className=' bg-gray-200 placeholder-[#b0c4de] hover:placeholder-[#948069] rounded-lg px-7 lg:px-10 py-2 w-[95%] lg:w-96 md:w-52 outline-none text-black '
//                 />
//             </div>

//             {/* search drop-down  */}
//             <div className=" flex justify-center">
//                 {search && <div className="block absolute bg-gray-200 w-[95%] md:w-96 lg:w-96 z-50 my-1 rounded-lg px-2 py-2">
//                     {filterSearchData.length > 0 ?
//                         <>
//                             {filterSearchData.map((item, index) => {
//                                 return (
//                                     <div key={index} className="py-2 px-2 cursor-pointer" onClick={() => navigate(`/productinfo/${item.id}`)}>
//                                         <div className="flex items-center gap-2">
//                                             <img className="w-10" src={item.productImageUrl} alt="" />
//                                             {item.title}
//                                         </div>
//                                     </div>
//                                 )
//                             })}
//                         </>
//                         :
//                         <>
//                             <div className="flex justify-center">
//                                 <img className=" w-20" src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png" alt="img" />
//                             </div>
//                         </>}
//                 </div>
//                 }
//             </div>
//         </div>
//     );
// }

// export default SearchBar;

import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import { useNavigate } from "react-router";
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
    const context = useContext(myContext);
    const { getAllProduct } = context;

    // Predefined categories for navigation
    const categories = [
        { title: "shirt",  image:'https://m.media-amazon.com/images/I/71jtkd3vr0L._AC_UL480_FMwebp_QL65_.jpg', path: "/category/shirt" },
        { title: "jacket",  image:'https://m.media-amazon.com/images/I/51qp9ls9+iL._AC_UL480_FMwebp_QL65_.jpg', path: "/category/jacket" },
        { title: "mobile", image:'https://m.media-amazon.com/images/I/71C8O0yT7hL._AC_UY327_FMwebp_QL65_.jpg', path: "/category/mobile" },
        { title: "laptop",  image:'https://m.media-amazon.com/images/I/513p8BwV-RL._SX679_.jpg', path: "/category/laptop" },
        { title: "shoes", image:'https://m.media-amazon.com/images/I/71cflgAolqL._SY695_.jpg', path: "/category/shoes" },
        { title: "home", image:'https://m.media-amazon.com/images/I/41aafWU+WrL._SY300_SX300_.jpg', path: "/category/home" },
        { title: "books",  image:'https://m.media-amazon.com/images/I/71DVDgwLPRL._AC_UY327_FMwebp_QL65_.jpg', path: "/category/shirt" },
    ];

    // Search State
    const [search, setSearch] = useState("");

    // Filtered products and categories based on search input
    const filteredProducts = getAllProduct.filter((obj) =>
        obj.title.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 8);

    const filteredCategories = categories.filter((cat) =>
        cat.title.toLowerCase().includes(search.toLowerCase())
    );

    const navigate = useNavigate();

    return (
        <div className="">
            {/* Search input */}
            <div className="relative input flex justify-center items-center">
                <IoSearch size={24} className="absolute left-3 md:left-0 lg:left-32 text-gray-700" />
                <input
                    type="text"
                    placeholder="Search here"
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-gray-200 placeholder-[#b0c4de] hover:placeholder-[#948069] rounded-lg px-7 lg:px-10 py-2 w-[95%] lg:w-96 md:w-52 outline-none text-black"
                />
            </div>

            {/* Search drop-down */}
            <div className="flex justify-center">
                {search && (
                    <div className="block absolute bg-gray-200 w-[95%] md:w-96 lg:w-96 z-50 my-1 rounded-lg px-2 py-2">
                        {filteredCategories.length > 0 || filteredProducts.length > 0 ? (
                            <>
                                {/* Render categories */}
                                {filteredCategories.map((category, index) => (
                                    <div
                                        key={`cat-${index}`}
                                        className="py-2 px-2 cursor-pointer"
                                        onClick={() => navigate(category.path)}
                                    >
                                        <div className="flex items-center gap-2">
                                        <img className="w-10" src={category.image} alt="" />
                                            <span className="text-black">{category.title}</span>
                                        </div>
                                    </div>
                                ))}

                                {/* Render products */}
                                {filteredProducts.map((item, index) => (
                                    <div
                                        key={`prod-${index}`}
                                        className="py-2 px-2 cursor-pointer"
                                        onClick={() => navigate(`/productinfo/${item.id}`)}
                                    >
                                        <div className="flex items-center gap-2">
                                            <img className="w-10" src={item.productImageUrl} alt="" />
                                            {item.title}
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                <div className="flex justify-center">
                                    <img
                                        className="w-20"
                                        src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png"
                                        alt="img"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
