import Session from './Session';
import { useEffect } from 'react'
import './App.css'
import { getNoSprayGeodata, getRouteGeodata, getSprayGeodata } from './scripts/geodata'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Dashboard } from './dashboard/dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Session/>
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  }
])

function App() {
 useEffect(() => {
  const routeData = getRouteGeodata();
  const sprayData = getSprayGeodata(false);
  const sprayDataBelowThreshold = getSprayGeodata(true);
  const noSprayDataBelowThreshold = getNoSprayGeodata();

  // Route of the truck
  console.log(routeData);
  // Collections of points where sprayed
  console.log(JSON.stringify(sprayData));

  // Collection of points where sprayed but was unsure
  console.log(JSON.stringify(sprayDataBelowThreshold))

  // Collection of points where not sprayed but was unsure
  console.log(JSON.stringify(noSprayDataBelowThreshold));
 }, [])




  return (
    <RouterProvider router={router}/>
  
  )
}

export default App
