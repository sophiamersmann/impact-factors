import { csv } from 'd3-fetch';
import { ascending } from 'd3-array';

import { dataPath } from '../inputs/constants';

const loadData = async () => {
  const data = await csv(dataPath, (d) => ({
    authors: d.Authors,
    title: d.Title,
    journal: d['Source title'],
    year: +d.Year,
    volume: +d.Volume,
    issue: +d.Issue,
    page: { start: +d['Page start'], end: +d['Page end'] },
    citedBy: +d['Cited by'],
    doi: d['DOI'],
  }));

  return data.sort((a, b) =>
    ascending(a.journal, b.journal) ||
    ascending(a.year, b.year) ||
    ascending(a.volume, b.volume) ||
    ascending(a.issue, b.issue) ||
    ascending(a.page.start, b.page.start));
};

export default loadData;
