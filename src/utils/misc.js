import { pointRadial } from 'd3-shape';

export function arcLine(radius, startAngle, endAngle) {
  return [
      `M${pointRadial(startAngle, radius)}`,
      `A${radius},${radius} 0,0,1 ${pointRadial(endAngle, radius)}`,
  ].join(' ');
}
