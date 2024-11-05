import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Nav() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const logouts = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const navigateToWriteBlog = () => {
    navigate("/write");
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">THOUGHT ALLEY</span>
            <div className="hidden md:block ml-10 space-x-4">
              <a href="#" onClick={openModal} className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                My Articles
              </a>
              <a href="#" onClick={openModal} className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Bookmarks
              </a>
              <a href="#" onClick={logouts} className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Logout
              </a>
            </div>
          </div>
          <button onClick={navigateToWriteBlog} className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-full text-white bg-green-600 hover:bg-green-700">
            Write
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold">🚧 Coming Soon!</h2>
            <p className="mt-2 text-gray-600">Stay tuned for exciting updates!</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Nav;
