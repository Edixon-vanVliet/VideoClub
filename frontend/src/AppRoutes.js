import { Home } from "./components/Home";
import { GenerosPage } from "./pages/GenerosPage";
import { IdiomasPage } from "./pages/IdiomasPage";
import { TiposArticulosPage } from "./pages/TiposArticulosPage";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/generos",
    element: <GenerosPage />,
  },
  {
    path: "/idiomas",
    element: <IdiomasPage />,
  },
  {
    path: "/tiposArticulos",
    element: <TiposArticulosPage />,
  },
];

export default AppRoutes;
