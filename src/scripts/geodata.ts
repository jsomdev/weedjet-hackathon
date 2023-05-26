import geoJsonSample from './samples/sampleRoute.json';
import {data} from 'azure-maps-control';

const certaintyThreshold = 0.75;


export type RouteProperties = {
  "speed (km/h)": string;
};

export type RouteFeature = data.Feature<data.Point, RouteProperties>;

export type RouteGeoJson = {
  features: RouteFeature[];
};

export type SprayProperties = {
  hasSprayed: boolean;
  certainty: number;
}

export type SprayFeature = data.Feature<data.Point, SprayProperties>;

export type SprayGeoJson = {
  features: SprayFeature[];
}

export function getRouteGeodata(): RouteGeoJson {
  const filteredFeatures: typeof geoJsonSample.features = [];

  // Loop through each feature
  geoJsonSample.features.forEach(element => {

    // We've considered a geojson feature identical if they share the same latitude, longitude, time & date.
    // E.G. this will reduce the initial sample size from 5000 points to 251
    const featureAlreadyExists = !!filteredFeatures.find(feature => {
      const hasSameLatitude = feature.properties.latitude === element.properties.latitude;
      const hasSameLongitude = feature.properties.latitude === element.properties.latitude;
      const hasSameTime = feature.properties.time === element.properties.time
      const hasSameDate = feature.properties.date === element.properties.date;
      return hasSameDate && hasSameTime && hasSameLatitude && hasSameLongitude
    })
    if (!featureAlreadyExists) {
      filteredFeatures.push(element)
    }
  });
  const newSamples: typeof geoJsonSample = { ...geoJsonSample, features: filteredFeatures }
  return newSamples;

}

export function getSprayGeodata(certain: boolean): SprayFeature[] {
  const initialData = geoJsonSample.features;
  const clusterPoints: SprayFeature[] = [];

  const minClusterInterval = 10;
  const maxClusterInterval = 70;

  const minClusterSize = 10;
  const maxClusterSize = 30;


  let index = 0;

  function nextCluster(currentIndex: number): number {
    if (initialData.length - currentIndex < maxClusterInterval) {
      return -1;
    }

    const interval = Math.floor(Math.random() * (maxClusterInterval - minClusterInterval + 1)) + minClusterInterval;
    return currentIndex + interval
  }

  function getClusterSize(): number {
    return Math.floor(Math.random() * (maxClusterSize - minClusterSize + 1)) + minClusterSize
  }

  function getDeviatedCoordinate(coordinate: number): number {
    const a = 0.0005
    const deviation = (Math.random() * a) - (a / 2)
    return coordinate + deviation
  }

  function getCertainty(): number {
    return (Math.random() * 0.40) + 0.60
  }


  while (index >= 0) {
    index = nextCluster(index);

    if (index >= 0) {
      const feature = initialData[index];
      const clusterSize = getClusterSize();
      if (feature) {
        for (let clusterIndex = 0; clusterIndex < clusterSize - 1; clusterIndex++) {
          const longitude = getDeviatedCoordinate(feature.geometry.coordinates[0]);
          const latitude = getDeviatedCoordinate(feature.geometry.coordinates[1]);
          const certainty = getCertainty();
          if (!certain || certain && certainty < certaintyThreshold)
            clusterPoints.push({
              ...feature,
              properties: {
                certainty,
                hasSprayed: true
              },
              geometry: {
                type: "Point",
                coordinates: [longitude, latitude]
              },

            })

        }
      }
    }


  }
  return clusterPoints;
}


export function getNoSprayGeodata(): SprayFeature[]{
  const initialData = geoJsonSample.features;
  const clusterPoints: SprayFeature[] = [];

  const minClusterInterval = 45;
  const maxClusterInterval = 60;

  const minClusterSize = 2;
  const maxClusterSize = 5;


  let index = 0;

  function nextCluster(currentIndex: number): number {
    if (initialData.length - currentIndex < maxClusterInterval) {
      return -1;
    }

    const interval = Math.floor(Math.random() * (maxClusterInterval - minClusterInterval + 1)) + minClusterInterval;
    return currentIndex + interval
  }

  function getClusterSize(): number {
    return Math.floor(Math.random() * (maxClusterSize - minClusterSize + 1)) + minClusterSize
  }

  function getDeviatedCoordinate(coordinate: number): number {
    const deviation = (Math.random() * 0.00001) - 0.000005
    return coordinate + deviation
  }

  function getCertainty(): number {
    return (Math.random() * 0.40) + 0.60
  }


  while (index >= 0) {
    index = nextCluster(index);

    if (index >= 0) {
      const feature = initialData[index];
      const clusterSize = getClusterSize();
      if (feature) {
        for (let clusterIndex = 0; clusterIndex < clusterSize - 1; clusterIndex++) {
          const longitude = getDeviatedCoordinate(feature.geometry.coordinates[0]);
          const latitude = getDeviatedCoordinate(feature.geometry.coordinates[1]);
          const certainty = getCertainty()

          if (certainty < certaintyThreshold)
            clusterPoints.push({
              ...feature,
              properties: {
                certainty,
                hasSprayed: false
              },
              geometry: {
                type: "Point",
                coordinates: [longitude, latitude]
              },
            })

        }
      }
    }
  }

  return clusterPoints;
}