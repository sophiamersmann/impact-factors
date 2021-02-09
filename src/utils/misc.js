const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const normalize = (s) => s.replace(' ', '-').toLowerCase();
const denormalize = (s) => s.split('-').map(capitalize).join(' ');
