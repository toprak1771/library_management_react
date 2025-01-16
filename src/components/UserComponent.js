import React, { useEffect, useState } from "react";
import UserService from "../services/UserService";
import { NavLink } from "react-router";

function UserComponent() {
  const [users, setUsers] = useState([]);

  const userService = new UserService();

  useEffect(() => {
    getallUsers();
  }, []);

  const getallUsers = () => {
    userService.getallUsers().then((response) => {
      if (response.status === 200) {
        console.log(response.data.users);
        setUsers(response.data.users);
      }
    });
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              CreatedAt
            </th>
            <th scope="col" className="px-6 py-3">
              UpdatedAt
            </th>
            <th scope="col" className="px-6 py-3">
              Detail
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className={
                "bg-white dark:bg-gray-800 border-b dark:border-gray-700"
              }
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {user.id}
              </th>
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.createdAt}</td>
              <td className="px-6 py-4">{user.updatedAt}</td>
              <td className="px-6 py-4">
                <NavLink to={"/users/" + user.id}>
                  <div className="px-2 py-3 bg-white rounded-3xl cursor-pointer">
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

export default UserComponent;
