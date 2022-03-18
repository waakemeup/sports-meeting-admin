import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import router from "../router/router";

interface Props {}

const View = (props: Props) => {
  return (
    <Routes>
      {router.map((r) => {
        return (
          <Route
            path={r.path}
            index={r.index}
            key={r.key}
            element={r.component}
          />
        );
      })}
    </Routes>
  );
};

export default View;
