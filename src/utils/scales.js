import {
  scalePoint,
  scaleLinear,
  extent,
} from 'd3';

import { angleScale, skyScale } from '../stores/scales';

const setDimScales = (data, innerRadius, outerRadius) => {
  if (!data) return;
  
  angleScale.set(scalePoint()
    .domain(data.map((d) => d.location))
    .range([(2 * Math.PI) / data.length, 2 * Math.PI]));
  
  skyScale.set(scaleLinear()
    .domain(extent(data, d => d.citedBy))
    .range([innerRadius, outerRadius]));
};

export default setDimScales;
