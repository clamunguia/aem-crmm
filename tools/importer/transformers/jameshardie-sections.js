/* eslint-disable */
/* global WebImporter */

/**
 * James Hardie sections transformer.
 *
 * beforeTransform: resolve each template section to an element (selectors tried
 * in order, first element not already claimed by an earlier section), then walk
 * them in reverse document order inserting <hr> before every non-first section.
 * Styled sections get a temporary data-excat-section-id marker on their <hr>;
 * a styled first section gets a temporary marked <hr> as well.
 *
 * afterTransform: walk the markers in reverse, append Section Metadata at the
 * end of each styled section (before the next <hr>), drop the marker attribute
 * and remove the first section's temporary <hr>.
 */

const MARKER = 'data-excat-section-id';
const FIRST_MARKER = 'data-excat-section-first';

function safeQueryAll(root, selector) {
  try {
    return [...root.querySelectorAll(selector)];
  } catch (e) {
    return [];
  }
}

function resolveSections(root, sections) {
  const claimed = new Set();
  const resolved = [];
  sections.forEach((section) => {
    const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
    for (let i = 0; i < selectors.length; i += 1) {
      if (!selectors[i]) continue;
      const el = safeQueryAll(root, selectors[i]).find((c) => !claimed.has(c)
        && ![...claimed].some((o) => o.contains(c) || c.contains(o)));
      if (el) {
        claimed.add(el);
        resolved.push({ section, el });
        break;
      }
    }
  });
  // document order
  resolved.sort((a, b) => {
    if (a.el === b.el) return 0;
    // eslint-disable-next-line no-bitwise
    return a.el.compareDocumentPosition(b.el) & 4 ? -1 : 1;
  });
  return resolved;
}

export default function transform(hookName, element, payload) {
  const document = (payload && payload.document) || element.ownerDocument;
  const template = (payload && payload.template) || {};
  const sections = Array.isArray(template.sections) ? template.sections : [];
  if (sections.length < 2) return;

  if (hookName === 'beforeTransform') {
    const resolved = resolveSections(element, sections);
    for (let i = resolved.length - 1; i >= 0; i -= 1) {
      const { section, el } = resolved[i];
      const isFirst = i === 0;
      if (isFirst && !section.style) continue;
      const hr = document.createElement('hr');
      if (section.style) hr.setAttribute(MARKER, section.id);
      if (isFirst) hr.setAttribute(FIRST_MARKER, 'true');
      el.parentNode.insertBefore(hr, el);
    }
  }

  if (hookName === 'afterTransform') {
    const byId = {};
    sections.forEach((s) => { byId[s.id] = s; });
    const markers = safeQueryAll(element, `hr[${MARKER}]`);
    for (let i = markers.length - 1; i >= 0; i -= 1) {
      const hr = markers[i];
      const section = byId[hr.getAttribute(MARKER)];
      if (section && section.style) {
        const meta = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        // end of this section = just before the next <hr> sibling, else end of parent
        let next = hr.nextElementSibling;
        while (next && next.tagName !== 'HR') next = next.nextElementSibling;
        if (next) next.parentNode.insertBefore(meta, next);
        else hr.parentNode.appendChild(meta);
      }
      hr.removeAttribute(MARKER);
      if (hr.hasAttribute(FIRST_MARKER)) hr.remove();
    }
  }
}
