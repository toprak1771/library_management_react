import React, { useEffect, useState } from "react";
import BookService from "../services/BookService";
import { NavLink } from "react-router";
import { useDispatch } from "react-redux";
import { addBook } from "../bookSlice";

function BookComponent() {
  const dispatch = useDispatch()

  const bookService = new BookService();

  const [books, setBooks] = useState([]);
  const [tableCols, setTableCols] = useState([]);

  useEffect(() => {
    getallBooks();
  }, []);

  const getallBooks = () => {
    bookService.getallBooks().then((response) => {
      if (response.status === 200) {
        setBooks(response.data.books);
        setTableCols(Object.keys(response.data.books[0]));
      }
    });
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {tableCols.map((key, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                {key}
              </th>
            ))}
            <th scope="col" className="px-6 py-3">
              Detail
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr
              key={book.id}
              className={`${
                book.status === true
                  ? "bg-red-500"
                  : "bg-white dark:bg-gray-800"
              }  border-b dark:border-gray-700`}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {book.id}
              </th>
              <td className="px-6 py-4">{book.name}</td>
              <td className="px-6 py-4">{book.author}</td>
              <td className="px-6 py-4">{book.year}</td>
              <td className="px-6 py-4">{book.score}</td>
              <td className="px-6 py-4">{book.status.toString()}</td>
              <td className="px-6 py-4">{book.user?.id}</td>
              <td className="px-6 py-4">{book.createdAt}</td>
              <td className="px-6 py-4">{book.updatedAt}</td>
              <td className="px-6 py-4">{book.user?.name}</td>
              <td className="px-6 py-4">
                <NavLink to={"/books/" + book.id}>
                  <div className="px-2 py-3 bg-white rounded-xl cursor-pointer" onClick={() => dispatch(addBook(book))}>
                    <p className="text-center text-black text-xs">
                      Go to Detail{" "}
                    </p>
                  </div>
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookComponent;
