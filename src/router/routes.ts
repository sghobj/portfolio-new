import {ComponentType} from "react";
import {Home} from "../pages/home/Home.tsx";

export type RouteConfig = {
    path: string;
    element: ComponentType;
    children?: RouteConfig[];
}
export const routes: RouteConfig[] = [
    {path: '/', element: Home}
]