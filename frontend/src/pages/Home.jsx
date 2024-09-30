import React from "react";
import BookList from "../components/BookList";
import UserList from "../components/Users";

const Home = () => {
  return (
    <div>
      <BookList />
      <UserList />
    </div>
  );
};

export default Home;
