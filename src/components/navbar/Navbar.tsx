import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useOutsideClick from "../../hooks/useOutsideClick";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(handleClickOutside);

  function handleClickOutside() {
    setIsOpen(false);
  }

  return (
    <nav
      onClick={(event) => event.stopPropagation()}
      className="flex flex-col items-start w-full z-50 fixed text-gray-800 bg-white border-b border-b-gray-200 md:py-0 md:flex-row md:items-center md:justify-between drop-shadow"
    >
      <div className="w-full px-8 py-4 flex justify-between md:items-center md:self-stretch md:py-0 md:w-auto">
        <Link to="/">
          <h1 className="flex md:gap-2 md:p-4 items-end font-extrabold cursor-pointer">
            <i className="fa-solid fa-flask text-3xl pb-1"></i>
            <span className="text-2xl">Farmácia</span>
          </h1>
        </Link>
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className={`${
            isOpen && "hidden"
          } text-gray-800 md:hidden hover:bg-gray-100 rounded-lg px-2`}
        >
          <i className="fa-solid fa-bars fa-lg"></i>
        </button>
        <button
          className={`${
            !isOpen && "hidden"
          } text-gray-800 md:hidden hover:bg-gray-100 rounded-lg px-2`}
        >
          <i className="fa-solid fa-xmark fa-lg"></i>
        </button>
      </div>
      <div
        className={`flex flex-col ${
          isOpen ? "max-h-screen" : "max-h-0"
        }  gap-4 w-full overflow-hidden md:gap-0 md:max-h-full md:h-[4.5rem] md:w-auto md:flex-row md:justify-between transition-all`}
      >
        <ul
          ref={ref}
          className="flex flex-col md:flex-row items-start md:items-center font-bold"
        >
          <li className="w-full">
            <NavLink
              to={"/"}
              className={({ isActive, isPending }) =>
                isActive
                  ? "block w-full px-8 py-4 md:py-6 bg-gray-100"
                  : isPending
                  ? "block w-full px-8 py-4 md:py-6 animate-pulse"
                  : "block w-full px-8 py-4 md:py-6 hover:bg-gray-100"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              to={"/categorias"}
              className={({ isActive, isPending }) =>
                isActive
                  ? "block w-full px-8 py-4 md:py-6 bg-gray-100"
                  : isPending
                  ? "block w-full px-8 py-4 md:py-6 animate-pulse"
                  : "block w-full px-8 py-4 md:py-6 hover:bg-gray-100"
              }
            >
              Categorias
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              to={"/produtos"}
              className={({ isActive, isPending }) =>
                isActive
                  ? "block w-full px-8 py-4 md:py-6 bg-gray-100"
                  : isPending
                  ? "block w-full px-8 py-4 md:py-6 animate-pulse"
                  : "block w-full px-8 py-4 md:py-6 hover:bg-gray-100"
              }
            >
              Produtos
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
