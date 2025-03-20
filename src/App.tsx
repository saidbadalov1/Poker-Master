import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { PokerGame } from "./pages/PokerGame";
import { Quiz } from "./pages/Quiz";

import "./App.css";
import { Home } from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "quiz",
        element: <Quiz />,
      },
      {
        path: "game",
        element: <PokerGame />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
