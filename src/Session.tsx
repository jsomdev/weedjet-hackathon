import {AzureMapsProvider} from "react-azure-maps";
import React from "react";
import MapController from "./MapController.tsx";


const Session: React.FC = ({sprayData}) => (
  <AzureMapsProvider>
    <MapController sprayData={sprayData} />
  </AzureMapsProvider>
);

export default Session;