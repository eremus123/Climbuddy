import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
const Main = React.lazy(() => import("./pages/Main"));
const Groups = React.lazy(() => import("./pages/Groups"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const List = React.lazy(() => import("./pages/List"));
const Passes = React.lazy(() => import("./pages/Passes"));
const Gyms = React.lazy(() => import("./pages/Gyms"));

import NavBar from "./components/NavBar";

import { useState, useEffect } from "react";
import { Suspense } from "react";

function App() {
  return (
    <>
      <Suspense fallback={<h1>loading...</h1>}>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Navigate replace to="/main" />} />
          <Route path="main" element={<Main />} />
          <Route path="groups/:id" element={<Groups />} />
          <Route path="list" element={<List />} />
          <Route path="gyms" element={<Gyms />} />
          <Route path="passes" element={<Passes />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
