import {
  DataGenerationConfiguration,
  Point,
  Position,
  RouteFeature,
  RouteGeoJson,
  SprayFeature,
  SprayGeoJson,
} from "./types";

const defaultSprayConfiguration: DataGenerationConfiguration = {
  aiModel: {
    threshold: 0.75,
    minimumCertainty: 0.4,
  },
  clusters: {
    intervalRange: [5, 35],
    sizeRange: [4, 22],
    startDeviation: 0.0003,
    correlatedDeviation: 0.0001,
  },
};
const defaultNoSprayConfiguration: DataGenerationConfiguration = {
  aiModel: {
    threshold: 0.75,
    minimumCertainty: 0.4,
  },
  clusters: {
    intervalRange: [12, 64],
    sizeRange: [1, 5],
    startDeviation: 0.0003,
    correlatedDeviation: 0.0001,
  },
};

export function getNoSprayData(
  routeData: RouteGeoJson,
  configuration: DataGenerationConfiguration = defaultNoSprayConfiguration
) {
  return getSprayData(routeData, configuration);
}

export function getSprayData(
  routeData: RouteGeoJson,
  configuration: DataGenerationConfiguration = defaultSprayConfiguration
): SprayGeoJson {
  let referenceIndex: number | null = 0;
  const sprayFeatures: SprayFeature[] = [];

  while (referenceIndex !== null) {
    referenceIndex = generateNextClusterReferenceIndex(
      referenceIndex,
      routeData.features.length,
      configuration.clusters.intervalRange[0],
      configuration.clusters.intervalRange[1]
    );

    if (referenceIndex !== null) {
      const reference: RouteFeature =
        routeData.features[referenceIndex as number];

      const cluster = generateSprayFeatureCluster(
        reference.geometry,
        configuration.clusters.sizeRange[0],
        configuration.clusters.sizeRange[1],
        configuration.clusters.startDeviation,
        configuration.clusters.correlatedDeviation,
        configuration.aiModel.minimumCertainty
      );

      sprayFeatures.push(...cluster);
    }
  }

  const sprayGeoJson: SprayGeoJson = {
    features: sprayFeatures,
  };

  return sprayGeoJson;
}

function generateNextClusterReferenceIndex(
  currentIndex: number,
  totalItems: number,
  minimum: number,
  maximum: number
): number | null {
  if (totalItems - currentIndex < maximum) {
    return null;
  }

  const interval =
    Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  return currentIndex + interval;
}

function generateSprayFeatureCluster(
  reference: Point,
  minimumSize: number,
  maximumSize: number,
  standardDeviation: number,
  correlatedDeviation: number,
  minimumCertainty: number
): SprayFeature[] {
  const size: number = generateRandomClusterSize(minimumSize, maximumSize);

  const centerSprayFeature: SprayFeature = generateSprayFeature(
    reference,
    standardDeviation,
    minimumCertainty
  );

  const sprayFeatures: SprayFeature[] = [centerSprayFeature];

  while (sprayFeatures.length < size) {
    const correlatedSprayFeature: SprayFeature = generateSprayFeature(
      centerSprayFeature.geometry,
      correlatedDeviation,
      minimumCertainty
    );
    sprayFeatures.push(correlatedSprayFeature);
  }

  return sprayFeatures;
}

function generateSprayFeature(
  reference: Point,
  deviation: number,
  minimumCertainty: number
): SprayFeature {
  const newPosition: Position = generateRandomLatitudeAndLongitude(
    reference.coordinates,
    deviation
  );
  const certainty = generateRandomCertainty(minimumCertainty);

  const feature: SprayFeature = {
    geometry: {
      coordinates: newPosition,
      type: "Point",
    },
    type: "Feature",
    properties: {
      certainty: certainty,
      hasSprayed: true,
    },
  };

  return feature;
}

function generateRandomLatitudeAndLongitude(
  reference: Position,
  deviation: number
): Position {
  const longitude: number = generateRandomCoordinate(reference[0], deviation);
  const latitude: number = generateRandomCoordinate(reference[1], deviation);

  return [longitude, latitude];
}

function generateRandomCoordinate(
  reference: number,
  deviation: number
): number {
  return reference + (Math.random() * deviation - deviation / 2);
}

function generateRandomClusterSize(
  minimumSize: number,
  maximumSize: number
): number {
  return (
    Math.floor(Math.random() * (maximumSize - minimumSize + 1)) + minimumSize
  );
}

function generateRandomCertainty(
  minimum = defaultSprayConfiguration.aiModel.minimumCertainty
) {
  return Math.random() * minimum + (1 - minimum);
}
