import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const activeClass = "bg-amber-100 border-amber-400 font-bold";

  return (
    <header className="border-2 border-amber-700 rounded-lg m-2 bg-gradient-to-r from-amber-700 to-amber-800 shadow-lg">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="hover:scale-105 transition-transform">
            <h1 className="font-playfair text-3xl font-bold text-amber-50">
              Dine<span className="text-amber-200">Wise</span>
            </h1>
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-full border-2 border-amber-500 bg-amber-600/20 text-amber-100 hover:bg-amber-600/40 transition-all duration-200 ${
                location.pathname === '/' ? activeClass : ''
              }`}
            >
              Home
            </Link>
            
            <Link
              to="/tables"
              className={`px-4 py-2 rounded-full border-2 border-amber-400 bg-amber-600/20 text-amber-100 hover:bg-amber-600/40 transition-all duration-200 ${
                location.pathname === '/tables' ? activeClass : ''
              }`}
            >
              Live Tables
            </Link>
            
            <Link
              to="/orders"
              className={`px-4 py-2 rounded-full border-2 border-amber-300 bg-amber-600/20 text-amber-100 hover:bg-amber-600/40 transition-all duration-200 ${
                location.pathname === '/orders' ? activeClass : ''
              }`}
            >
              Orders
            </Link>
            
            <Link
              to="/menu"
              className={`px-4 py-2 rounded-full border-2 border-amber-200 bg-amber-600/20 text-amber-100 hover:bg-amber-600/40 transition-all duration-200 ${
                location.pathname === '/menu' ? activeClass : ''
              }`}
            >
              Our Menu
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;



// import { Link, useLocation } from 'react-router-dom';

// const Navbar = () => {
//   const location = useLocation();
//   const activeClass = "bg-pink-100 border-pink-400 font-bold";

//   return (
//     <header className="border-4 border-pink-200 rounded-lg m-2 bg-gradient-to-r from-pink-50 to-rose-50 shadow-lg">
//       <div className="mx-auto max-w-7xl px-6 py-4">
//         <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//           {/* Logo (now clickable for homepage) */}
//           <Link to="/" className="hover:scale-105 transition-transform">
//             <h1 className="font-playfair text-3xl font-bold text-pink-700">
//               Dine<span className="text-rose-600">Wise</span>
//             </h1>
//           </Link>

//           {/* Navigation Links */}
//           <nav className="flex flex-wrap justify-center gap-4">
//             <Link
//               to="/"
//               className={`px-4 py-2 rounded-full border-2 border-purple-300 bg-white/80 text-purple-700 hover:bg-purple-100 transition-all duration-200 ${
//                 location.pathname === '/' ? activeClass : ''
//               }`}
//             >
//               Home
//             </Link>
            
//             <Link
//               to="/tables"
//               className={`px-4 py-2 rounded-full border-2 border-pink-300 bg-white/80 text-pink-700 hover:bg-pink-100 transition-all duration-200 ${
//                 location.pathname === '/tables' ? activeClass : ''
//               }`}
//             >
//               Live Tables
//             </Link>
            
//             <Link
//               to="/orders"
//               className={`px-4 py-2 rounded-full border-2 border-rose-300 bg-white/80 text-rose-700 hover:bg-rose-100 transition-all duration-200 ${
//                 location.pathname === '/orders' ? activeClass : ''
//               }`}
//             >
//               Orders
//             </Link>
            
//             <Link
//               to="/menu"
//               className={`px-4 py-2 rounded-full border-2 border-fuchsia-300 bg-white/80 text-fuchsia-700 hover:bg-fuchsia-100 transition-all duration-200 ${
//                 location.pathname === '/menu' ? activeClass : ''
//               }`}
//             >
//               Our Menu
//             </Link>
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
// export default Navbar;
