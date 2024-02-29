import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center gap-2">
      <h2 className="text-5xl text-center font-extrabold max-w-lg border-gray-300 leading-snug p-4 md:text-7xl">
        Bem vindo à nossa farmácia!
      </h2>
      <span>Os produtos da melhor qualidade!</span>
      <Link
        to="/produtos"
        className="bg-transparent mt-6 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Visualizar produtos
      </Link>
    </div>
  );
}
