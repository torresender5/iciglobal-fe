
import { createBrowserRouter } from "react-router-dom";
// import "./index.css";
import LoginRoutes from "./LoginRoutes";
import MainRoutes from "./MainRoutes";


const Router = createBrowserRouter([...LoginRoutes, ...MainRoutes]);
export default Router;
