import {AzureMapsProvider} from "react-azure-maps";
import React from "react";
import MapController from "./MapController.tsx";


const Session: React.FC = () => (
  <AzureMapsProvider>
    <MapController />
  </AzureMapsProvider>
);

export default Session;