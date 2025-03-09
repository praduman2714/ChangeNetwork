'use client'

import { Container, Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import UserList from "../../components/Users/UserList";

import MainLayout from "@/layouts/admin";
import Breadcrumbs from "@/core/Breadcrum";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const UsersPage = () => {
  // Dummy data
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
    { id: "2", name: "Bob Smith", email: "bob@example.com", role: "User" },
    { id: "3", name: "Charlie Brown", email: "charlie@example.com", role: "User" },
  ]);

  // Function to add a user
  const addUser = () => {
    const newUser: User = {
      id: `${users.length + 1}`,
      name: `User ${users.length + 1}`,
      email: `user${users.length + 1}@example.com`,
      role: "User",
    };
    setUsers([...users, newUser]);
  };

  // Function to delete a user
  const deleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const links = [
    { id: 1, page: "Users Dashboard", link: "/users" },
    // { id: 2, page: "Promissory-Note", link: "/promissory-note" },
  ];

  return (
    <MainLayout title="USERS">
      <>
        {/* Breadcrumbs */}
        <div className="px-2 md:px-0 ml-14 mt-10 mb-10">
          <Breadcrumbs links={links} />
        </div>
        <div className="w-[95%] mx-auto my-4 -mt-5 bg-white">
          <UserList users={users} onDelete={deleteUser}/>
        </div>
      </>
    </MainLayout>
  );
};

export default UsersPage;
