import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import BookService from "../services/BookService";
import Select from "react-dropdown-select";
import UserService from "../services/UserService";

function BookDetail() {
  let { id } = useParams();

  const bookService = new BookService();
  const userService = new UserService();
  const [book, setBook] = useState({});
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    getBookById(id);
    getallUsers();
  }, [book]);

  const getBookById = (bookId) => {
    bookService.getBookById(bookId).then((response) => {
      if (response.status === 200) {
        setBook(response.data.book);
      }
    });
  };

  const getallUsers = () => {
    userService.getallUsers().then((response) => {
      if (response.status === 200) {
        setUsers(response.data.users);
      }
    });
  };

  const borrowBook = () => {
    const data = {
      user_id: selectedUser[0].id,
      book_id: Number(id),
    };
    console.log(data);
    userService.borrowBookToUser(data).then((response) => {
      getBookById(Number(id));
    });
  };

  return (
    <div className="relative overflow-x-auto h-screen">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {Object.keys(book).map((key, index) => (
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
          <tr className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
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
            <td className="px-6 py-4">{book.status?.toString()}</td>
            <td className="px-6 py-4">{book.user?.id}</td>
            <td className="px-6 py-4">{book.createdAt}</td>
            <td className="px-6 py-4">{book.updatedAt}</td>
            <td className="px-6 py-4">
              <Select
                options={users}
                labelField="name"
                valueField="id"
                placeholder={book?.user?.name}
                onChange={(values) => setSelectedUser(values)}
              />
            </td>
            <td className="px-6 py-4">
              <div
                className={`${
                  book.status === true || selectedUser === null
                    ? "pointer-events-none cursor-not-allowed opacity-50"
                    : "hover:bg-gray-200"
                } px-2 py-3 bg-white rounded-xl cursor-pointer`}
                onClick={borrowBook}
              >
                <p className="text-center text-black text-xs">Borrow</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BookDetail;
