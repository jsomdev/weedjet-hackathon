import Session from "./session/Session";
import { useEffect } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./dashboard/dashboard";
import sampleRoute from "./scripts/samples/sampleRoute.json";
import { getNoSprayData, getSprayData } from "./scripts/sprayHelper";
import { getRouteData } from "./scripts/routeHelper";

const routeData = getRouteData(sampleRoute);
const sprayData = getSprayData(routeData);
const noSprayData = getNoSprayData(routeData);

const router = createBrowserRouter([
  {
    path: "/session",
    element: <Session sprayData={sprayData} />,
  },
  {
    path: "/",
    element: <Dashboard />,
  },
]);

function App() {
  useEffect(() => {
    // Route of the truck
    console.log("route", routeData);
    // Collections of points where sprayed
    console.log("spray", sprayData);
    // Collection of points where not sprayed
    console.log("nospray", noSprayData);
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
