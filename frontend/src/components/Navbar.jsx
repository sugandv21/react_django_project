import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setDropdownOpen(false);
    navigate("/login"); // redirect to login after logout
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <div className="font-bold text-xl">MyLogo</div>
      <div className="flex gap-6 items-center relative">
        <Link to="/">Home</Link>
        <Link to="/contact">Contact Us</Link>

        {user ? (
          <div className="relative">
            <button
              className="hover:underline"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user.username} ⬇
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10">
                <button
                  className="px-4 py-2 w-full text-left hover:bg-gray-200"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
