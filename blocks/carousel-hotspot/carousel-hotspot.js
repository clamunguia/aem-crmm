/*
 * Carousel Hotspot
 * Image slider whose photos carry product hotspots with popovers.
 * Each row is a slide: image | hotspot | hotspot | ...
 * A hotspot cell starts with its position as "x, y" (percent of the image,
 * e.g. "40, 62"), followed by the popover content (heading, text, link).
 * A cell without a position is used as the slide caption.
 * The first hotspot of the first slide starts open, as on the source site.
 */
import { buildSlider, optimizeImages } from '../../scripts/block-utils.js';

const POSITION = /^\s*(\d+(?:\.\d+)?)\s*%?\s*[,/;x ]\s*(\d+(?:\.\d+)?)\s*%?\s*$/i;
const SVG_NS = 'http://www.w3.org/2000/svg';
// popover offsets from the pin, measured on the source
const SIDE_OFFSET = 50; // pin width (40) + 10
const EDGE_OFFSET = 10;
let hotspotId = 0;

function svg(width, height, paths, className) {
  const el = document.createElementNS(SVG_NS, 'svg');
  el.setAttribute('width', width);
  el.setAttribute('height', height);
  el.setAttribute('viewBox', `0 0 ${width} ${height}`);
  el.setAttribute('fill', 'none');
  el.setAttribute('aria-hidden', 'true');
  el.setAttribute('focusable', 'false');
  if (className) el.setAttribute('class', className);
  paths.forEach(([d, cls]) => {
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', d);
    path.setAttribute('stroke', 'currentColor');
    path.setAttribute('stroke-width', '1.5');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    if (cls) path.setAttribute('class', cls);
    el.append(path);
  });
  return el;
}

const plusIcon = () => svg(18, 18, [['M1.5 9H16.5'], ['M9 1.5V16.5', 'carousel-hotspot-pin-v']], 'carousel-hotspot-pin-icon');
const arrowIcon = () => svg(18, 16, [['M1.5 8H16.5'], ['M9.5 15L16.5 8L9.5 1']], 'carousel-hotspot-link-icon');

/** Places an open popover next to its pin, inside the image (source placement rules). */
function place(pin, pop) {
  const stage = pin.parentElement;
  const stageW = stage.clientWidth;
  const stageH = stage.clientHeight;
  if (!stageW || !stageH) return;
  const x = pin.offsetLeft;
  const y = pin.offsetTop;
  const w = pop.offsetWidth;
  const h = pop.offsetHeight;
  let left;
  let top;
  if (x + SIDE_OFFSET + w <= stageW) {
    // beside the pin, vertically centred on it
    left = x + SIDE_OFFSET;
    top = y + pin.offsetHeight / 2 - h / 2;
    if (top < 0) top = Math.max(0, y - EDGE_OFFSET);
    if (top + h > stageH) top = Math.max(0, stageH - h);
  } else {
    // above the pin in the lower half of the image, below it in the upper half
    left = Math.max(0, Math.min(x - EDGE_OFFSET, stageW - w));
    top = y > stageH / 2 ? y - EDGE_OFFSET - h : y + SIDE_OFFSET;
    top = Math.max(0, Math.min(top, stageH - h));
  }
  pop.style.left = `${left}px`;
  pop.style.top = `${top}px`;
}

function setOpen(pin, open) {
  const pop = document.getElementById(pin.getAttribute('aria-controls'));
  pin.setAttribute('aria-expanded', String(open));
  if (!pop) return;
  pop.hidden = !open;
  if (open) place(pin, pop);
}

function closeAll(block, except) {
  block.querySelectorAll('.carousel-hotspot-pin[aria-expanded="true"]').forEach((pin) => {
    if (pin !== except) setOpen(pin, false);
  });
}

/** Turns a standalone link paragraph into a plain arrow link (undoes EDS button decoration). */
function decorateLink(pop) {
  pop.querySelectorAll('a[href]').forEach((a) => {
    a.classList.remove('button', 'primary', 'secondary', 'accent');
    a.classList.add('carousel-hotspot-link');
    const label = document.createElement('span');
    label.append(...a.childNodes);
    a.append(label, arrowIcon());
    const p = a.parentElement;
    if (p && p !== pop && p.tagName === 'P' && p.textContent.trim() === a.textContent.trim()) {
      p.replaceWith(a);
    }
  });
}

function buildHotspot(cell, block) {
  const first = cell.firstElementChild || cell;
  const match = first.textContent.match(POSITION);
  if (!match) return null;
  const [, x, y] = match;
  if (first !== cell) first.remove();
  hotspotId += 1;
  const id = `carousel-hotspot-pop-${hotspotId}`;

  const pop = document.createElement('div');
  pop.className = 'carousel-hotspot-popover';
  pop.id = id;
  pop.hidden = true;
  const body = document.createElement('div');
  body.className = 'carousel-hotspot-popover-body';
  body.append(...cell.childNodes);
  decorateLink(body);
  pop.append(body);
  const name = body.querySelector('h1, h2, h3, h4, h5, h6, strong')?.textContent.trim();
  if (name) {
    pop.setAttribute('role', 'group');
    pop.setAttribute('aria-label', name);
  }

  const pin = document.createElement('button');
  pin.type = 'button';
  pin.className = 'carousel-hotspot-pin';
  pin.style.left = `${Math.min(100, parseFloat(x))}%`;
  pin.style.top = `${Math.min(100, parseFloat(y))}%`;
  pin.setAttribute('aria-expanded', 'false');
  pin.setAttribute('aria-controls', id);
  pin.setAttribute('aria-label', 'Show more info.');
  pin.append(plusIcon());
  pin.addEventListener('click', () => {
    const open = pin.getAttribute('aria-expanded') !== 'true';
    closeAll(block, pin);
    setOpen(pin, open);
  });
  return [pin, pop];
}

export default function decorate(block) {
  const slides = [];
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const imageCell = cells.find((c) => c.querySelector('picture, img'));
    if (!imageCell) return;
    const slide = document.createElement('div');
    slide.className = 'carousel-hotspot-item';
    const stage = document.createElement('div');
    stage.className = 'carousel-hotspot-stage';
    const picture = imageCell.querySelector('picture') || imageCell.querySelector('img');
    stage.append(picture);
    const caption = document.createElement('div');
    caption.className = 'carousel-hotspot-caption';
    if (imageCell.textContent.trim()) caption.append(...imageCell.childNodes);

    cells.filter((c) => c !== imageCell).forEach((cell) => {
      if (!cell.textContent.trim()) return;
      const hotspot = buildHotspot(cell, block);
      if (hotspot) stage.append(...hotspot);
      else caption.append(...cell.childNodes);
    });
    optimizeImages(stage, [{ media: '(min-width: 900px)', width: '1600' }, { width: '900' }]);
    slide.append(stage);
    if (caption.textContent.trim()) slide.append(caption);
    slides.push(slide);
  });

  block.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = block.querySelector('.carousel-hotspot-pin[aria-expanded="true"]');
    if (!open) return;
    closeAll(block);
    if (open.parentElement.contains(document.activeElement)) open.focus();
  });

  const slider = buildSlider(slides, 'carousel-hotspot', { label: 'Product gallery' });
  slider.querySelectorAll('.carousel-hotspot-prev, .carousel-hotspot-next').forEach((button) => {
    button.append(svg(18, 16, [['M16.5 8L1.5 8'], ['M8.5 1L1.5 8L8.5 15']], 'carousel-hotspot-arrow-icon'));
  });
  block.replaceChildren(slider);

  // keep open popovers placed when the image size changes (breakpoints, late CSS)
  const reposition = () => block.querySelectorAll('.carousel-hotspot-pin[aria-expanded="true"]')
    .forEach((pin) => setOpen(pin, true));
  const observer = new ResizeObserver(reposition);
  block.querySelectorAll('.carousel-hotspot-stage').forEach((stage) => observer.observe(stage));

  const firstPin = block.querySelector('.carousel-hotspot-pin');
  if (firstPin) setOpen(firstPin, true);
}
