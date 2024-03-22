import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Users from "./components/Users/Users";
import UsersGrid from "./components/Users/UsersGrid";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/users" element={<UsersGrid />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
