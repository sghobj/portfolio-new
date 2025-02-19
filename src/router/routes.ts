import {ComponentType} from "react";
import {Home} from "../pages/home/Home.tsx";
import {Cv} from "../pages/cv/Cv.tsx";

export type RouteConfig = {
    path: string;
    element: ComponentType;
    children?: RouteConfig[];
}
export const routes: RouteConfig[] = [
    {path: '/', element: Home},
    {path: '/cv', element: Cv},
]