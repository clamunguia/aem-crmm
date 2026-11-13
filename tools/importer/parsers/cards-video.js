/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-video.
 * Source: flex row of cards (:scope > div), each with a react-player <video poster src>,
 * a play button (chrome), an h2 title and a p description.
 * Output: one row per card: [poster image + video link] | [title, description, optional CTA].
 * Variant: 'cards-video (alt)' for the short (1-2 card) look-alike sets with trademark
 * superscripts in titles; plain 'cards-video' otherwise.
 */
export default function parse(element, { document }) {
  const cells = [];

  let cards = [...element.querySelectorAll(':scope > div')].filter((c) => c.querySelector('video, iframe, h1, h2, h3, h4, h5, h6'));
  if (!cards.length) cards = [...element.querySelectorAll('video')].map((v) => v.closest('div.flex-col') || v.parentElement);

  cards.forEach((card) => {
    // Media cell: poster image + link to the video file
    const media = [];
    const video = card.querySelector('video');
    const iframe = card.querySelector('iframe');
    const title = card.querySelector('h1, h2, h3, h4, h5, h6');
    const titleText = title ? title.textContent.trim() : '';
    if (video) {
      const poster = video.getAttribute('poster');
      const src = video.getAttribute('src') || video.querySelector('source[src]')?.getAttribute('src');
      if (poster) {
        const img = document.createElement('img');
        img.src = poster;
        img.alt = titleText;
        media.push(img);
      }
      if (src) {
        const a = document.createElement('a');
        a.href = src;
        a.textContent = src;
        media.push(a);
      }
    } else if (iframe && iframe.getAttribute('src')) {
      const a = document.createElement('a');
      a.href = iframe.getAttribute('src');
      a.textContent = a.href;
      media.push(a);
    } else {
      const img = card.querySelector('img');
      if (img) media.push(img);
    }

    // Body cell: heading, paragraphs, CTA links (outside the player)
    const body = [];
    const player = (video || iframe)?.closest('.relative') || null;
    [...card.children].forEach((child) => {
      if (player && (child === player || child.contains(player))) return;
      if (child.matches('button, svg')) return;
      if (!child.textContent.trim()) return;
      child.querySelectorAll('button, svg').forEach((n) => n.remove());
      body.push(child);
    });

    if (!media.length && !body.length) return;
    cells.push([media.length ? media : '', body.length ? body : '']);
  });

  const isAlt = cards.length > 0 && (cards.length < 3 || cards.some((c) => c.querySelector('h1 sup, h2 sup, h3 sup')));
  const name = isAlt ? 'cards-video (alt)' : 'cards-video';
  const block = WebImporter.Blocks.createBlock(document, { name, cells });
  element.replaceWith(block);
}
