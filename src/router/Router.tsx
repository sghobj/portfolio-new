import {Route, Routes} from "react-router-dom";
import {RouteConfig, routes} from "./routes.ts";
import {Fragment} from "react";


export const Router = () => {

        return (
            <Routes>
            {routes.map(({path, element: Element, children}: RouteConfig) => (
                <Fragment key={path}>
                    <Route key={path} path={path} element={<Element/>}/>
                    {children?.map(({path: childPath, element: ChildElement}) => (
                        <Route key={`${path}/${childPath}`} path={`${path}/${childPath}`} element={<ChildElement />} />
                    ))}
                </Fragment>
            ) )}
        </Routes>
        )
}
