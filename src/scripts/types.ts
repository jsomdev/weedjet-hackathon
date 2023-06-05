import { data } from "azure-maps-control";

export type RouteProperties = {
  "speed (km/h)": string;
  time: string;
  date: string;
};

export type Point = data.Point;
export type Position = data.Position;

export type RouteFeature = data.Feature<data.Point, RouteProperties>;

export type RouteGeoJson = {
  features: RouteFeature[];
};

export type SprayProperties = {
  hasSprayed: boolean;
  certainty: number;
};

export type SprayFeature = data.Feature<data.Point, SprayProperties>;

export type SprayGeoJson = {
  features: SprayFeature[];
};

export type DataGenerationConfiguration = {
  aiModel: {
    threshold: number;
    minimumCertainty: number;
  };
  clusters: {
    intervalRange: [number, number];
    sizeRange: [number, number];
    startDeviation: number;
    correlatedDeviation: number;
  };
};
