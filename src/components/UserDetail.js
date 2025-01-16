import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import BookService from "../services/BookService";
import Select from "react-dropdown-select";
import UserService from "../services/UserService";

const scores = [
  {
    id: 1,
    name: 1,
  },
  {
    id: 2,
    name: 2,
  },
  {
    id: 3,
    name: 3,
  },
  {
    id: 4,
    name: 4,
  },
  {
    id: 5,
    name: 5,
  },
  {
    id: 6,
    name: 6,
  },
  {
    id: 7,
    name: 7,
  },
  {
    id: 8,
    name: 8,
  },
  {
    id: 9,
    name: 9,
  },
  {
    id: 10,
    name: 10,
  },
];

function UserDetail() {
  let { id } = useParams();

  const userService = new UserService();
  const [user, setUser] = useState({});
  const [pastBooks, setPastBooks] = useState([]);
  const [selectedPresentBook, setSelectedPresentBook] = useState();
  const [score, setScore] = useState();

  useEffect(() => {
    getUserById(id);
  }, []);

  const getUserById = (userId) => {
    userService.getUserById(userId).then((response) => {
      if (response.status === 200) {
        console.log(response.data.user);
        setPastBooks(response.data.user.books.past);
        setUser(response.data.user);
      }
    });
  };

  const returnBook = () => {
    const data = {
      user_id: Number(id),
      book_id: selectedPresentBook.id,
      score: score.name
    };
    userService.returnBook(data).then(response => {
      if(response.status === 200) {
        getUserById(id)
      }
    })
  };

  return (
    <div className="relative overflow-x-auto h-screen">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Past Books
            </th>
            <th scope="col" className="px-6 py-3">
              Present Book
            </th>
            <th scope="col" className="px-6 py-3">
              Scores
            </th>
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
              {user.id}
            </th>
            <td className="px-6 py-4">{user.name}</td>
            <td className="px-6 py-4">
              {pastBooks.map((book, index) => (
                <div key={index} className="flex flex-row items-center">
                  <p>{book.name}-</p>
                  <p>{book.score}</p>
                </div>
              ))}
            </td>
            <td className="px-6 py-4">
              {user?.present_books?.length !== 0 && (
                <Select
                  options={user?.present_books}
                  labelField="name"
                  valueField="id"
                  onChange={(values) => setSelectedPresentBook(values[0])}
                />
              )}
            </td>

            <td className="px-6 py-4">
              {user?.present_books?.length !== 0 && (
                <Select
                  options={scores}
                  labelField="name"
                  valueField="id"
                  onChange={(values) => setScore(values[0])}
                />
              )}
            </td>
            <td className="px-6 py-4">
              <div
                className={`${
                  (user?.present_books?.length === 0 || score == null || selectedPresentBook == null)
                    ? "pointer-events-none cursor-not-allowed opacity-50"
                    : "hover:bg-gray-200"
                } px-2 py-3 bg-white rounded-xl cursor-pointer`}
                onClick={returnBook}
              >
                <p className="text-center text-black text-xs">Return</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UserDetail;
