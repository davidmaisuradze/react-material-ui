import { authRoutes } from "./feature/Auth";
import { notFoundRoute } from "./feature/NotFound";
import Cabinet from "feature/Common/Layout/components/Cabinet/Cabinet";

const cabinetRoute = {
  path: "/cabinet",
  component: Cabinet,
  isAuth: true,
  exact: false
};

export const routes = [...authRoutes, cabinetRoute, notFoundRoute];
