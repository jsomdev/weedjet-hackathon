import {AuthenticationType, AzureMap, AzureMapDataSourceProvider, AzureMapFeature, AzureMapLayerProvider, IAzureMapOptions} from "react-azure-maps";
import {data, math, Expression} from 'azure-maps-control';
import React from "react";
import routeData from './scripts/samples/sampleRoute.json';

type Properties = {
  'speed (km/h)': string;
}
const options: IAzureMapOptions = {
  authOptions: {
    authType: AuthenticationType.subscriptionKey,
    subscriptionKey: 'yS-xkYuGFfLQyUIWE1tZ_xJYEfHc_-9koDueXW3fmaY'
  },
  center: [
    9.8530967,
    56.98722
  ],
  zoom: 16,
};

function calculateGradientExpression(points: data.Feature<data.Point, Properties>[], line: data.Position[]) {
  const exp: Expression = [
    'interpolate',  //This will cause the colors from each data point to create a gradient between points.
    ['linear'],
    ['line-progress'],
  ];

  //Get the total length of the path.
  const totalLength = math.getLengthOfPath(line);

  //The line progress will be a fraction of the total length of the path,
  //so we can calculate the line progress value of each data point and set the color accordingly.
  let progress = 0;

  for (let i = 0; i < points.length; i++) {
    //The line progress value is a value between 0 and 1.
    //Taking the travelled distance and dividing it by the total distance of the path, will give us the line progress value.
    exp.push(progress / totalLength);

    //Add our business logic on how a data point should be colored based on the speed.
    const point = points[i];
    if (!point) {
      continue;
    }
    const speed = point?.properties?.['speed (km/h)'] ? parseInt(point?.properties?.['speed (km/h)'], 10) : undefined;
    if (!speed) {
      exp.push('green');//TODO neutral color?
    } else if (speed <= 8) {
      exp.push('green');
    } else if (speed < 10) {
      exp.push('yellow');
    } else {
      exp.push('red');
    }

    if (i < points.length - 1) {
      progress += math.getDistanceTo(points[i].geometry, points[i + 1].geometry);
    }
  }

  return exp;
}

const layers = ['route', 'sprayHeatMap', 'confidenceHeatMap'] as const;


type Layer = typeof layers[number];


function createLineFrom(points: data.Feature<data.Point, Properties>[]): data.Position[] {
  const coords = [];
  for (let i = 0; i < points.length; i++) {
    coords.push(points[i].geometry.coordinates);
  }
  return coords;
}


const Map: React.FC<{ visibleLayers: Array<Layer> }> = ({sprayData}) => {
  const routePoints = routeData.features as data.Feature<data.Point, Properties>[];
  const routeLine = createLineFrom(routePoints);
  const speedGradient = calculateGradientExpression(routePoints, routeLine);
  console.log('sprayData', sprayData);
  return (
    <div style={{ height: '80vh' }}>
      <AzureMap options={options}>
         <AzureMapDataSourceProvider id={'Spray HeatMap DataSource'}>
          <AzureMapLayerProvider id={'Spray HeatMap'} options={{
            radius: [
              'interpolate',
              ['exponential', 2],
              ['zoom'],
              //For all zoom levels 10 or lower, set the radius to 2 pixels.
              0, 14,

              //Between zoom level 10 and 22, exponentially scale the radius from 2 pixels to 50000 pixels.
              22, 500
            ]
          }} type={'HeatLayer'}/>
           {sprayData.map(feature => <AzureMapFeature type="Point" coordinate={feature.geometry.coordinates}/>)}
        </AzureMapDataSourceProvider>
        <AzureMapDataSourceProvider id={'Route DataSource'} options={{
          // This sample shows how to apply a stroke gradient to a line on the map.\
          // In order to apply this feature to a line, the data source must have the lineMetrics option set to true.
          lineMetrics: true,
        }}>
          <AzureMapLayerProvider id={'Route Layer Provider'} options={{
            strokeWidth: 5,
            strokeGradient: speedGradient,
          }} type={'LineLayer'}/>
          <AzureMapFeature type="LineString" coordinates={routeLine}/>
        </AzureMapDataSourceProvider>
      </AzureMap>
    </div>
  );
};

export default Map