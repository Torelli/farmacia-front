import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import { create, findAll } from "../service/Service";
import Categoria from "../model/Categoria";
import { useState } from "react";
import LoadingProductCard from "../components/cards/LoadingProductCard";
import PaginatedItems from "../components/pagination/PaginatedItems";

export async function loader({ params }) {
  const category = await findAll(`/categorias/${params.id}`);

  if (!category) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { category };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const category = Object.fromEntries(formData) as Categoria;
  category.id = params.id;

  await create("/categorias", category);
  return redirect(`/categorias/${params.id}`);
}

export default function CategoryContainer() {
  const [btnClicked, setBtnClicked] = useState(false);
  const navigation = useNavigation();
  const { category } = useLoaderData() as { category: Categoria };
  const products = category.produtos;

  return (
    <div className="w-full py-24 md:px-8 md:min-h-[90vh]">
      {btnClicked ? (
        <Form
          onSubmit={() => setBtnClicked(false)}
          method="post"
          className={`flex gap-4 ${navigation.state === "loading" && "pl-4"}`}
        >
          <input
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:drop-shadow-md transition-all focus-visible:outline-0 focus-visible:border-blue-500 peer"
            placeholder="Category"
            type="text"
            name="titulo"
            id="titulo"
            defaultValue={category.titulo}
            required
            autoFocus
          />
          <button
            type="submit"
            className="border px-3 rounded-lg hover:text-gray-500 transition-all"
          >
            <i className="fa-solid fa-check"></i>
          </button>
        </Form>
      ) : (
        <Form
          method="delete"
          action="destroy"
          className={`flex gap-4 ${navigation.state === "loading" && "pl-4"}`}
        >
          <h2
            className={`${
              navigation.state === "loading" &&
              "w-32 py-6 bg-gray-200 animate-pulse"
            } text-4xl font-bold px-4 md:px-0`}
          >
            {category.titulo}
          </h2>
          <span className="hidden"></span>
          <button
            type="button"
            onClick={() => setBtnClicked(true)}
            className="border px-3 rounded-lg hover:text-gray-500 transition-all"
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            type="submit"
            className="border px-3 rounded-lg hover:text-gray-500 transition-all"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </Form>
      )}

      <div className="mt-12 flex flex-col gap-4 items-center justify-center w-full">
        {navigation.state === "loading" ? (
          <>
            <LoadingProductCard />
            <LoadingProductCard />
          </>
        ) : products != null && products.length > 0 ? (
          <PaginatedItems
            category={category}
            items={products}
            itemsPerPage={3}
          />
        ) : (
          <h3 className="flex flex-col gap-12 text-center text-3xl mt-16 text-gray-800">
            Nenhum produto cadastrado
          </h3>
        )}
      </div>
    </div>
  );
}
