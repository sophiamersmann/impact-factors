import { extent } from 'd3-array';
import { scalePoint, scaleLinear } from 'd3-scale';

import { angleScale, skyScale } from '../stores/scales';

// TODO: To pass the value of stores feels weird
const setDimScales = (data, innerRadius, outerRadius) => {
  if (!data) return;
  
  const locations = data.map((d) => d.location);
  locations.push('pseudo');
  angleScale.set(scalePoint()
    .domain(locations)
    .range([0, 2 * Math.PI]));
  
  skyScale.set(scaleLinear()
    .domain(extent(data, d => d.citedBy))
    .range([innerRadius, outerRadius]));
};

export default setDimScales;
