import { useState } from "react";
import ReactPaginate from "react-paginate";
import Categoria from "../../model/Categoria";
import Produto from "../../model/Produto";
import ProductCard from "../cards/ProductCard";

function Items({
  currentItems,
  category,
}: {
  currentItems: Produto[];
  category?: Categoria;
}) {
  if (category)
    return (
      <div className="w-full p-4 grid grid-cols-[repeat(auto-fill,_minmax(250px,1fr))] auto-rows-[minmax(250px,_1fr)] gap-6">
        {currentItems &&
          currentItems.map((product: Produto) => (
            <ProductCard
              key={product.id}
              category={category}
              product={product}
            />
          ))}
      </div>
    );

  return (
    <>
      {currentItems &&
        currentItems.map((product: Produto) => (
          <ProductCard
            key={product.id}
            category={product.categoria}
            product={product}
          />
        ))}
    </>
  );
}

export default function PaginatedItems({
  itemsPerPage,
  items,
  category,
}: {
  itemsPerPage: number;
  items: Produto[];
  category?: Categoria;
}) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items category={category} currentItems={currentItems} />
      <ReactPaginate
        className="flex items-baseline justify-center gap-2 *:px-2 *:border *:rounded hover:*:bg-gray-100"
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="Previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
