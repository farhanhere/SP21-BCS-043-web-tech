// Pagination.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Pagination = ({ handlePagination, currentPage}) => {
  const [num, setNum] = useState(1);
  const [cur, setCur] = useState(currentPage || 1);
  const navigate = useNavigate();

  const pages = [
    { page: num },
    { page: num + 1 },
    { page: num + 2 },
    { page: num + 3 },
  ];

  const nextPage = () => {
    const nextPageNum = num + 1;
    setNum(nextPageNum);
    handlePagination(nextPageNum);

    // Update URL with the page parameter
    navigate(`/?page=${nextPageNum}`);
  };

  const prevPage = () => {
    if (num > 1) {
      const prevPageNum = num - 1;
      setNum(prevPageNum);
      handlePagination(prevPageNum);

      // Update URL with the page parameter
      navigate(`/?page=${prevPageNum}`);
    }
  };

  const goToPage = (page) => {
    setCur(page);
    handlePagination(page);

    // Update URL with the page parameter
    navigate(`/?page=${page}`);
  };

  return (
    <div className="flex justify-center items-center mt-4 bg-white rounded-lg font-[Poppins]">
      <button
        onClick={prevPage}
        className="h-12 border-2 border-r-0 border-black px-4 rounded-l-lg hover:bg-black hover:text-white"
      >
        &lt;
      </button>
      {pages.map((pg, i) => (
        <button
          key={i}
          onClick={() => goToPage(pg.page)}
          className={`h-12 border-2 border-r-0 border-black w-12 ${
            cur === pg.page && "bg-black text-white"
          }`}
        >
          {pg.page}
        </button>
      ))}
      <button
        onClick={nextPage}
        className="h-12 border-2 border-black px-4 rounded-r-lg hover:bg-black hover:text-white"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
