import React from "react";
import { Pagination } from "../../interfaces/product";

interface Props {
  method: Function;
  pagination: Pagination | undefined;
  rangePag: number[] | undefined;
}

const PaginationProducts = (props: Props) => {
  const { method, pagination, rangePag } = props;
  return (
    <div className="flex flex-col sm:items-start my-6 w-52">
      {pagination && pagination.totalPages > 1 && (
        <div className="flex text-gray-700">
          <div className="w-8 sm:h-10 sm:w-10 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
            <button
              className="hover:border-0"
              disabled={pagination.currentPage === 1}
              onClick={() => method(pagination.prevPage)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-chevron-left w-6 h-6"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          </div>
          <div className="flex h-10 font-medium rounded-full bg-gray-200">
            {rangePag?.map((pag, index) => (
              <div
                key={index}
                className={
                  (pagination.currentPage === pag
                    ? "bg-green-500 text-white"
                    : "") +
                  " w-8 sm:h-10 sm:w-10 flex justify-center items-center leading-5 transition duration-150 ease-in  rounded-full"
                }
              >
               <button className="w-full text-sm" disabled={pagination.currentPage === pag} onClick={() => method(pag)}>
               {pag}
               </button>
              </div>
            ))}
          </div>
          <div className="w-8 sm:h-10 sm:w-10 ml-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
            <button
              disabled={pagination.currentPage === pagination.totalPages}
              onClick={() => method(pagination.nextPage)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-chevron-right w-6 h-6"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginationProducts;
