import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Labels the footer document's sections by their role, so the CSS can lay them out:
 *   footer-main    the section holding the link columns (plus social links and contact)
 *   footer-logo    a section whose only content is a linked image
 *   footer-bottom  the last section (copyright, legal links, buttons)
 * The optional legal notes section keeps its author style, "footnotes".
 * @param {Element} footer The element holding the footer sections
 */
function labelSections(footer) {
  const sections = [...footer.querySelectorAll(':scope > .section')];
  sections.forEach((section) => {
    const content = section.querySelector(':scope > .default-content-wrapper');
    const onlyImage = content && content.children.length === 1 && content.querySelector('img')
      && !section.querySelector('.block');
    if (section.querySelector('.columns')) section.classList.add('footer-main');
    else if (onlyImage) section.classList.add('footer-logo');
  });
  const last = sections[sections.length - 1];
  if (last && !last.classList.contains('footer-main') && !last.classList.contains('footer-logo')) {
    last.classList.add('footer-bottom');
  }
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);
  labelSections(footer);

  block.append(footer);
}
