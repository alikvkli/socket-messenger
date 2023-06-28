import {createBrowserRouter} from "react-router-dom"
import Home from "../pages/home";
import Root from "./root";
import Chat from "../pages/chat";

export const router = createBrowserRouter([
    {
        path: "/",
        element:<Root/>,
        children: [
            {
                path:"",
                element: <Home/>
            },
            {
                path:"/:id",
                element: <Chat/>
            }
        ]
    }
]);


