import { csv } from 'd3-fetch';

import { dataPath } from '../inputs/constants';

const loadData = async () => {
  const data = await csv(dataPath, (d) => {
    const year = +d.Year;
    const volume = +d.Volume;
    const issue = +d.Issue;
    const page = { start: +d['Page start'], end: +d['Page end'] };

    return {
      authors: d.Authors,
      title: d.Title,
      journal: d['Source title'],
      year,
      volume,
      issue,
      page,
      location: [year, volume, issue, page.start].join('/'),
      citedBy: +d['Cited by'],
      doi: d['DOI'],
    };
  });

  return data;
};

export default loadData;
