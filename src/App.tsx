import Session from './Session';
import { useEffect } from 'react'
import './App.css'
import {getNoSprayGeodata, getRouteGeodata, getSprayGeodata} from './scripts/geodata'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Dashboard } from './dashboard/dashboard';
import sprayData from './scripts/samples/sampleSprayData.json';

//const sprayData = getSprayGeodata(false);

const router = createBrowserRouter([
  {
    path: "/session",
    element: <Session sprayData={sprayData}/>
  },
  {
    path: "/",
    element: <Dashboard />
  }
])

function App() {

 useEffect(() => {
  const routeData = getRouteGeodata();

  const sprayDataBelowThreshold = getSprayGeodata(true);
  const noSprayDataBelowThreshold = getNoSprayGeodata();

  // Route of the truck
  console.log('route', routeData);
  // Collections of points where sprayed
  console.log('spray', sprayDataBelowThreshold);

  // Collection of points where sprayed but was unsure
  console.log('below', (sprayDataBelowThreshold))

  // Collection of points where not sprayed but was unsure
  console.log('nospray below', noSprayDataBelowThreshold);
 }, [])




  return (
    <RouterProvider router={router}/>
  
  )
}

export default App
