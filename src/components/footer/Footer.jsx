import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* footer  */}
      <footer className="text-gray-600 body-font bg-gradient-to-r from-gray-900 via-gray-900 to-blue-900">
        {/* main  */}
        <div className="container px-5 py-5 mx-auto flex items-center sm:flex-row flex-col">
          
          <span className="text-xl text-white font-bold">Crafto-Kart</span>
          
          <p className="text-sm text-gray-100 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            © 2025 crafto-kart —
            <Link
              to={"/"}
              className="text-gray-100 ml-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              @crafto-kart
            </Link>
          </p>

          <p className="sm:ml-auto mt-4 sm:mt-0">
            <button
              onClick={() => navigate("/sellerform")}
              className="text-gray-100 ml-1 hover:text-gray-400 transition focus:outline-none"
            >
              Seller Form
            </button>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
