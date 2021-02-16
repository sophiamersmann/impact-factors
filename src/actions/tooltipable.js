import Tooltip from '../components/Tooltip.svelte';

export default function tooltipable(node, article) {
  let component;

  node.addEventListener('mouseenter', handleMouseenter);

  function handleMouseenter() {
    component = new Tooltip({
      target: document.body,
      props: { article },
      intro: true
    });

    node.addEventListener('mouseleave', handleMouseleave);
  }

  function handleMouseleave() {
    component.$destroy();
    node.removeEventListener('mouseleave', handleMouseleave);
  }

  return {
    destroy() {
      node.removeEventListener('mouseenter', handleMouseenter);
    },
  };
};
