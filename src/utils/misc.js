const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export const normalize = (s) => s.replace(' ', '-').toLowerCase();
export const denormalize = (s) => s.split('-').map(capitalize).join(' ');
