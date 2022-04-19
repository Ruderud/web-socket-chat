import { useState } from "react";
import { Route, Routes } from "react-router";

import { Cat, getCatByAge, postNewCat } from "./api/catApi";
import Chats from "./pages/Chats";
import Intro from "./pages/Intro";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Intro />} />
        <Route path={"/chats:id"} element={<Chats />} />
      </Routes>
    </>
  );
}

export default App;
