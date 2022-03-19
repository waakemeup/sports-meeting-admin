import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import View from "./components/View";
// import Page404 from "./views/404/Page404";

// const Login = lazy(() => import("./views/login/Login"));
// const Page404 = lazy(() => import("./views/404/Page404"));
// const Dashboard = lazy(() => import("./views/dashboard/Dashboard"));

function App() {
  return (
    <>
      <Suspense
        fallback={
          <>
            <div className="flex items-center justify-center">
              Page is Loading... |{"  "}
              <a
                className="text-blue-200"
                href="https://www.bilibili.com/video/BV1GJ411x7h7?from=search&seid=7540959031706207336&spm_id_from=333.337.0.0"
              >
                这里有好康的🤪
              </a>
            </div>
          </>
        }
      >
        <View />
      </Suspense>
    </>
  );
}

export default App;
