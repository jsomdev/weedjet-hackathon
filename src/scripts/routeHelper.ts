import { RouteGeoJson, RouteFeature } from "./types";
import routeSampleData from "./samples/sampleRoute.json";

export function getRouteData(sample?: RouteGeoJson): RouteGeoJson {
  if (!sample) {
    sample = routeSampleData;
  }
  const deduplicatedSample: RouteGeoJson = deduplicateRouteData(sample);

  return deduplicatedSample;
}

function deduplicateRouteData(routeData: RouteGeoJson): RouteGeoJson {
  const filteredFeatures: RouteFeature[] = [];

  // Loop through each feature
  routeData.features.forEach((element) => {
    // We've considered a geojson feature identical if they share the same latitude, longitude, time & date.
    // E.G. this will reduce the initial sample size from 5000 points to 251
    const featureAlreadyExists = !!filteredFeatures.find((feature) => {
      const hasSameLatitude =
        feature.geometry.coordinates[1] === element.geometry.coordinates[1];
      const hasSameLongitude =
        feature.geometry.coordinates[0] === element.geometry.coordinates[0];
      const hasSameTime = feature.properties?.time === element.properties?.time;
      const hasSameDate = feature.properties?.date === element.properties?.date;
      return hasSameDate && hasSameTime && hasSameLatitude && hasSameLongitude;
    });
    if (!featureAlreadyExists) {
      filteredFeatures.push(element);
    }
  });
  const newSamples: RouteGeoJson = {
    ...routeSampleData,
    features: filteredFeatures,
  };
  return newSamples;
}
