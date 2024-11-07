import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm', searchTerm)
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`)
  }
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
    }
  }, [location.search])

  return (
    <header className="bg-blue-600 shadow-md sticky top-0 border-b border-blue-700 z-10">
      <div className="flex justify-between items-center max-w-6xl m-auto p-3 text-white">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-blue-200">Four</span>
            <span className="text-white">HorseMen</span>
          </h1>
        </Link>
        <ul className="flex gap-4 items-center">
          <Link to={"/"}>
            <li className="hidden sm:inline text-white hover:underline">Home</li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden sm:inline text-white hover:underline">About</li>
          </Link>
          <Link to={"/profile"}>
            {currentUser ? (
              <img
                src={currentUser.avatar || "default-avatar.png"}
                className="h-7 w-7 rounded-full object-cover"
                alt="User Avatar"
              />
            ) : (
              <li className="sm:inline text-white hover:underline">Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}