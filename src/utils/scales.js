import { extent } from 'd3-array';
import { scalePoint, scaleLinear } from 'd3-scale';

import { angleScale, skyScale } from '../stores/scales';

// TODO: To pass the value of stores feels weird
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
