import { observer } from "mobx-react-lite";
import React, { Suspense } from "react";
import View from "./components/View";

function App() {
  return (
    <>
      <Suspense
        fallback={
          <>
            <div className="flex items-center justify-center w-screen h-screen text-2xl font-bold bg-cool-gray-400">
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

export default observer(App);
