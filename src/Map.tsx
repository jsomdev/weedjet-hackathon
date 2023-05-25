import {AuthenticationType, AzureMap, AzureMapDataSourceProvider, AzureMapFeature, AzureMapLayerProvider, IAzureMapOptions} from "react-azure-maps";
import {data, math} from 'azure-maps-control';
import React from "react";

type Properties = {
  speed: number;
}
const options: IAzureMapOptions = {
  authOptions: {
    authType: AuthenticationType.subscriptionKey,
    subscriptionKey: 'yS-xkYuGFfLQyUIWE1tZ_xJYEfHc_-9koDueXW3fmaY'
  },
  center: [-122.135, 47.65],
  zoom: 12,
  view: 'Auto',
}

function calculateGradientExpression(points: data.Feature<data.Point, Properties>[], line: data.Position[]) {
  const exp: (string | string[] | number)[] = [
    'interpolate',  //This will cause the colors from each data point to create a gradient between points.
    ['linear'],
    ['line-progress']
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
    if(!point){
      continue;
    }
    const speed= point?.properties?.speed;
    if(!speed){
      exp.push('green');//TODO neutral color?
    } else if (speed <= 60) {
      exp.push('green');
    } else if (speed < 70) {
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

const points = [
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.18822, 47.63208] }, properties: { speed: 55 } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.18204, 47.63196] }, properties: { speed: 57 } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.17243, 47.62976] }, properties: { speed: 58 } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.16419, 47.63023] }, properties: { speed: 60 } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.15852, 47.62942] }, properties: { speed: 62 } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.15183, 47.62988] }, properties: { speed: 63 } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.14256, 47.63451] }, properties: { speed: 61 } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.13483, 47.64041] }, properties: { speed: 65 } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.13466, 47.64422] }, properties: { speed: 67 } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.13844, 47.65440] }, properties: { speed: 68 } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.13277, 47.66515] }, properties: { speed: 70 } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.12779, 47.66712] }, properties: { speed: 73 } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.11595, 47.66712] }, properties: { speed: 75 } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.11063, 47.66735] }, properties: { speed: 68 } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.10668, 47.67035] }, properties: { speed: 64 } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.10565, 47.67498] }, properties: { speed: 60 } }
];

function createLineFrom(points: data.Feature<data.Point, Properties>[]): data.Position[] {
  const coords = [];
  for (let i = 0; i < points.length; i++) {
    coords.push(points[i].geometry.coordinates);
  }
  return coords;
}


const Map: React.FC<{ visibleLayers: Array<Layer> }> = () => {
  const routeLine = createLineFrom(points);
  const speedGradient = calculateGradientExpression(points, routeLine);
  return (
    <div style={{ height: '80vh' }}>
      <AzureMap options={options}>
        {/* <AzureMapDataSourceProvider id={'Spray HeatMap DataSource'}>
          <AzureMapLayerProvider id={'Spray HeatMap'} options={{}} type={'HeatLayer'}/>
          <AzureMapFeature type="Point" coordinate={point1}/>
          <AzureMapFeature type="Point" coordinate={point2} />
          <AzureMapFeature type="Point" coordinate={point3} />
        </AzureMapDataSourceProvider>*/}
        <AzureMapDataSourceProvider id={'Route DataSource'} options={{
          // This sample shows how to apply a stroke gradient to a line on the map.\
          // In order to apply this feature to a line, the data source must have the lineMetrics option set to true.
          lineMetrics: true,
        }}>
          <AzureMapLayerProvider id={'Route Layer Provider'} options={{
            strokeWidth: 5,
            strokeGradient: speedGradient,
          }} type={'LineLayer'}/>
          <AzureMapFeature type="LineString" coordinates={routeLine} />
        </AzureMapDataSourceProvider>
      </AzureMap>
    </div>
  );
};

export default Map