import  { useContext, useEffect } from 'react';
import { AzureMapsContext, IAzureMapsContextProps } from 'react-azure-maps';
import { layer, source } from 'azure-maps-control';
import Map from './Map.tsx';
const dataSourceRef = new source.DataSource();
const layerRef = new layer.SymbolLayer(dataSourceRef);

const MapController = () => {
  // Here you use mapRef from context
  const { mapRef, isMapReady } = useContext<IAzureMapsContextProps>(AzureMapsContext);

  const onTestClick = () => {
    alert('Hello');
  };


  useEffect(() => {
    if (isMapReady && mapRef) {
      // Need to add source and layer to map on init and ready
      mapRef.sources.add(dataSourceRef);
      mapRef.layers.add(layerRef);
    }
  }, [isMapReady, mapRef]);

  return (
    <>
      <div style={styles.buttonContainer}>
        <button onClick={onTestClick}>
          Test
        </button>
      </div>
      <Map visibleLayers={['route']} />
    </>
  );
};

// Some styles
const styles = {
  buttonContainer: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridGap: '10px',
    gridAutoColumns: 'max-content',
    padding: '10px 0',
    alignItems: 'center',
  },
};

export default MapController;