import Session from './Session';
import { useEffect } from 'react'
import './App.css'
import { getNoSprayGeodata, getRouteGeodata, getSprayGeodata } from './scripts/geodata'

function App() {
 useEffect(() => {
  const routeData = getRouteGeodata();
  const sprayData = getSprayGeodata();
  const noSprayData = getNoSprayGeodata();

  console.log(routeData);
  console.log(JSON.stringify(sprayData));
  console.log(JSON.stringify(noSprayData));
 }, [])




  return (
    <>
      <Session/>
    </>
  )
}

export default App
