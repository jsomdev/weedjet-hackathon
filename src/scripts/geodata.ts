import geoJsonSample from './samples/weedject-hackathon-rape.json';

export function getRouteGeodata():typeof geoJsonSample {
    const filteredFeatures: typeof geoJsonSample.features = [];

    // Loop through each feature
    geoJsonSample.features.forEach(element => {

      // We've considered a geojson feature identical if they share the same latitude, longitude, time & date.
      // E.G. this will reduce the initial sample size from 5000 points to 251
      const featureAlreadyExists = !!filteredFeatures.find(feature => {
        const hasSameLatitude = feature.properties.latitude === element.properties.latitude;
        const hasSameLongitude =feature.properties.latitude === element.properties.latitude;
        const hasSameTime = feature.properties.time === element.properties.time
        const hasSameDate = feature.properties.date === element.properties.date;
        return hasSameDate && hasSameTime && hasSameLatitude && hasSameLongitude
      })
      if(!featureAlreadyExists) {
        filteredFeatures.push(element)
      }
    });
    const newSamples: typeof geoJsonSample = {...geoJsonSample, features: filteredFeatures}
    return newSamples;
  
}

export function getSprayGeodata(): Array<typeof geoJsonSample.features[0] & {sprayData: {
    hasSprayed: boolean;
    certainty: number;
}}> {
    const initialData = geoJsonSample.features;
    const clusterPoints: Array<typeof geoJsonSample.features[0] & {sprayData: {
        hasSprayed: boolean;
        certainty: number;
    }}> = [];

    const minClusterInterval = 15;
    const maxClusterInterval = 20;

    const minClusterSize = 6;
    const maxClusterSize = 10;


  
    let index = 0;

    function nextCluster(currentIndex: number): number {
        if (initialData.length - currentIndex < maxClusterInterval) {
            return -1;
        }

        const interval = Math.floor(Math.random() * (maxClusterInterval - minClusterInterval + 1)) + minClusterInterval;
        return currentIndex + interval
    }

    function getClusterSize(): number {
        return Math.floor(Math.random() * (maxClusterSize- minClusterSize + 1)) + minClusterSize
    }

    function getDeviatedCoordinate(coordinate: number): number {
        const deviation = (Math.random() * 0.00001) - 0.000005
        return coordinate + deviation
    }

    function getCertainty(): number {
        return (Math.random() * 0.80) + 0.20
    }

   

    while (index >= 0) {
        index = nextCluster(index);
        
        if(index >= 0) {
            const feature = initialData[index];
            const clusterSize = getClusterSize();
            if (feature) {
                for (let clusterIndex = 0; clusterIndex < clusterSize - 1; clusterIndex++) {
                    const longitude = getDeviatedCoordinate(feature.geometry.coordinates[0]);
                    const latitude = getDeviatedCoordinate(feature.geometry.coordinates[1]);
                    clusterPoints.push({
                        ...feature,
                        properties: {...feature.properties,
                        latitude, longitude},
                        geometry: {
                            type: "Point",
                            coordinates: [longitude, latitude]
                        },
                        sprayData: {
                            certainty: getCertainty(),
                            hasSprayed: true
                        }
                    })
                    
                }
            }
        }

       
    }


    return clusterPoints;

}


export function getNoSprayGeodata(): Array<typeof geoJsonSample.features[0] & {sprayData: {
    hasSprayed: boolean;
    certainty: number;
}}> {
    const initialData = geoJsonSample.features;
    const clusterPoints: Array<typeof geoJsonSample.features[0] & {sprayData: {
        hasSprayed: boolean;
        certainty: number;
    }}> = [];

    const minClusterInterval = 35;
    const maxClusterInterval = 45;

    const minClusterSize = 1;
    const maxClusterSize = 3;


   
    let index = 0;

    function nextCluster(currentIndex: number): number {
        if (initialData.length - currentIndex < maxClusterInterval) {
            return -1;
        }

        const interval = Math.floor(Math.random() * (maxClusterInterval - minClusterInterval + 1)) + minClusterInterval;
        return currentIndex + interval
    }

    function getClusterSize(): number {
        return Math.floor(Math.random() * (maxClusterSize- minClusterSize + 1)) + minClusterSize
    }

    function getDeviatedCoordinate(coordinate: number): number {
        const deviation = (Math.random() * 0.00001) - 0.000005
        return coordinate + deviation
    }

    function getCertainty(): number {
        return (Math.random() * 0.80) + 0.20
    }

   

    while (index >= 0) {
        index = nextCluster(index);
        
        if(index >= 0) {
            const feature = initialData[index];
            const clusterSize = getClusterSize();
            if (feature) {
                for (let clusterIndex = 0; clusterIndex < clusterSize - 1; clusterIndex++) {
                    const longitude = getDeviatedCoordinate(feature.geometry.coordinates[0]);
                    const latitude = getDeviatedCoordinate(feature.geometry.coordinates[1]);
                    const certainty = getCertainty()                
                    clusterPoints.push({
                        ...feature,
                        properties: {...feature.properties,
                        latitude, longitude},
                        geometry: {
                            type: "Point",
                            coordinates: [longitude, latitude]
                        },
                        sprayData: {
                            certainty,
                            hasSprayed: false
                        }
                    })
                    
                }
            }
        }

       
    }


    return clusterPoints;

}