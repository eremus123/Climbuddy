import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserContext from "./context/user";
import Login from "./components/Login";
import Registration from "./components/Registration";
import { Suspense } from "react";

const Main = React.lazy(() => import("./pages/Main"));
const Groups = React.lazy(() => import("./pages/Groups"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const List = React.lazy(() => import("./pages/List"));
const Passes = React.lazy(() => import("./pages/Passes"));
const Gyms = React.lazy(() => import("./pages/Gyms"));
const Sessions = React.lazy(() => import("./pages/Sessions"));

import NavBar from "./components/NavBar";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [role, setRole] = useState("");
  const [showLogin, setShowLogin] = useState(true); // Toggle between login and registration

  return (
    <UserContext.Provider
      value={{ accessToken, setAccessToken, role, setRole }}
    >
      <Suspense fallback={<h1>loading...</h1>}>
        <NavBar />
        {accessToken.length > 0 ? (
          <Routes>
            <Route path="/" element={<Navigate replace to="/main" />} />
            <Route path="main" element={<Main />} />
            <Route path="groups/:id" element={<Groups />} />
            <Route path="list" element={<List />} />
            <Route path="sessions" element={<Sessions />} />
            <Route path="gyms" element={<Gyms />} />
            <Route path="passes" element={<Passes />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        ) : showLogin ? (
          <Login setShowLogin={setShowLogin} />
        ) : (
          <Registration setShowLogin={setShowLogin} />
        )}
      </Suspense>
    </UserContext.Provider>
  );
}

export default App;
