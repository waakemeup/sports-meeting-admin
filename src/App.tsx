import React, { Suspense } from "react";
import View from "./components/View";
// import Page404 from "./views/404/Page404";

// const Login = lazy(() => import("./views/login/Login"));
// const Page404 = lazy(() => import("./views/404/Page404"));
// const Dashboard = lazy(() => import("./views/dashboard/Dashboard"));

function App() {
  return (
    <>
      <Suspense fallback={<></>}>
        <View />
      </Suspense>
    </>
  );
}

export default App;
