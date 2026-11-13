/*
 * Announcement Bar
 * Dismissible promo strip. One row: message (text + optional link).
 * Dismissal is remembered for the browser session per message.
 */

function messageKey(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = ((hash * 31) + text.charCodeAt(i)) % 2147483647;
  }
  return `announcement-bar-dismissed-${hash}`;
}

export default function decorate(block) {
  const content = document.createElement('div');
  content.className = 'announcement-bar-content';
  [...block.children].forEach((row) => {
    [...row.children].forEach((cell) => content.append(...cell.childNodes));
  });
  const text = content.textContent.trim();
  if (!text) {
    block.closest('.section')?.classList.add('announcement-bar-empty');
    block.remove();
    return;
  }

  const key = messageKey(text);
  let dismissed = false;
  try {
    dismissed = sessionStorage.getItem(key) === '1';
  } catch { /* storage unavailable */ }
  if (dismissed) {
    block.hidden = true;
    return;
  }

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'announcement-bar-close';
  close.setAttribute('aria-label', 'Dismiss announcement');
  close.addEventListener('click', () => {
    block.hidden = true;
    try {
      sessionStorage.setItem(key, '1');
    } catch { /* storage unavailable */ }
  });

  block.setAttribute('role', 'region');
  block.setAttribute('aria-label', 'Announcement');
  block.replaceChildren(content, close);
}
