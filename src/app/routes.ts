import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { Talk } from "./components/Talk";
import { Journal } from "./components/Journal";
import { Dates } from "./components/Dates";
import { Heal } from "./components/Heal";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "talk", Component: Talk },
      { path: "journal", Component: Journal },
      { path: "dates", Component: Dates },
      { path: "heal", Component: Heal },
    ],
  },
]);
