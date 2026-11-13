/*
 * Carousel Cards
 * Heading and intro beside a slider of link cards with arrows and a progress bar.
 * Leading rows without an image are the intro (heading, text, link).
 * Every other row is a card: image | title, text, link.
 * When a card's title is a link, the image and title become one link (as on the source),
 * and the remaining links render as topic pills.
 * Controls hide automatically when all cards fit (e.g. the two-card "alt" layout).
 * Options: alt, alt-2.
 */
import { buildCardList, buildSlider } from '../../scripts/block-utils.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

function svg(width, height, paths, className) {
  const el = document.createElementNS(SVG_NS, 'svg');
  el.setAttribute('width', width);
  el.setAttribute('height', height);
  el.setAttribute('viewBox', `0 0 ${width} ${height}`);
  el.setAttribute('fill', 'none');
  el.setAttribute('aria-hidden', 'true');
  el.setAttribute('focusable', 'false');
  el.setAttribute('class', className);
  paths.forEach((d) => {
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', d);
    path.setAttribute('stroke-width', '1.5');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    el.append(path);
  });
  return el;
}

const cardArrow = () => svg(24, 24, ['M4 20.25L19.91 4.34', 'M4.91003 4.33997H19.91V19.34'], 'carousel-cards-card-arrow');
const navArrow = () => svg(18, 16, ['M16.5 8L1.5 8', 'M8.5 1L1.5 8L8.5 15'], 'carousel-cards-nav-arrow');

/**
 * Turns image + linked title into one card link, the other links into topic pills.
 * Cards without a linked heading are left as authored.
 * @param {HTMLElement} card
 */
function decorateCard(card) {
  const body = card.querySelector('.carousel-cards-card-body');
  const heading = body?.querySelector('h1, h2, h3, h4, h5, h6');
  const titleLink = heading?.querySelector('a[href]');
  if (!titleLink) return;

  const link = document.createElement('a');
  link.href = titleLink.href;
  link.className = 'carousel-cards-card-main';
  link.setAttribute('aria-label', titleLink.textContent.trim());
  titleLink.replaceWith(...titleLink.childNodes);

  const title = document.createElement('div');
  title.className = 'carousel-cards-card-title';
  title.append(heading, cardArrow());

  const image = card.querySelector('.carousel-cards-card-image');
  if (image) link.append(image);
  link.append(title);

  const pills = document.createElement('div');
  pills.className = 'carousel-cards-card-pills';
  body.querySelectorAll('a[href]').forEach((a) => {
    a.className = 'carousel-cards-pill';
    a.removeAttribute('title');
    const label = document.createElement('span');
    label.append(...a.childNodes);
    a.append(label);
    pills.append(a);
  });

  const extra = [...body.children].filter((el) => el.textContent.trim() || el.querySelector('img'));
  body.replaceChildren(...extra);
  card.replaceChildren(link);
  if (extra.length) card.append(body);
  if (pills.children.length) card.append(pills);
}

export default function decorate(block) {
  const intro = document.createElement('div');
  intro.className = 'carousel-cards-intro';
  const rows = [...block.children];
  while (rows.length && !rows[0].querySelector('picture, img')) {
    const row = rows.shift();
    [...row.children].forEach((cell) => intro.append(...cell.childNodes));
    row.remove();
  }

  const list = buildCardList(block, 'carousel-cards');
  const cards = [...list.children].map((li) => {
    const card = document.createElement('div');
    card.className = li.className;
    card.append(...li.childNodes);
    decorateCard(card);
    return card;
  });

  const label = intro.querySelector('h1, h2, h3, h4, h5, h6')?.textContent.trim() || 'Cards';
  const children = [];
  if (intro.textContent.trim()) children.push(intro);
  if (cards.length) {
    const slider = buildSlider(cards, 'carousel-cards', { label });
    slider.querySelectorAll('.carousel-cards-prev, .carousel-cards-next').forEach((btn) => btn.append(navArrow()));
    children.push(slider);
  }
  block.classList.toggle('carousel-cards-has-intro', !!intro.textContent.trim());
  block.replaceChildren(...children);
}
