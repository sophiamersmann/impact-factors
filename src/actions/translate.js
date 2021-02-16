export default function translate(node, delta) {
	setTransform(node, delta);
	
	return {
		update(delta) {
			setTransform(node, delta);
		}
	};
}

function setTransform(node, delta) {
  const transformValue = node.style.getPropertyValue('transform')
    .split(' ')
    .map((s) => s.trim())
    .filter((value) => !value.includes('translate'))
    .join(' ');

  node.style.setProperty(
    'transform',
    transformValue + ` translate(${delta.dx || 0}px, ${delta.dy || 0}px)`);
}
