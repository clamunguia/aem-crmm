/*
 * Table Plain
 * Plain data table. Each row of the block is a table row; the first row is
 * the header unless the block has the `no-header` class.
 * Based on the Block Collection table block.
 */
export default function decorate(block) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  const header = !block.classList.contains('no-header');

  [...block.children].forEach((row, i) => {
    const tr = document.createElement('tr');
    [...row.children].forEach((cell) => {
      const isHead = i === 0 && header;
      const td = document.createElement(isHead ? 'th' : 'td');
      if (isHead) td.setAttribute('scope', 'col');
      td.append(...cell.childNodes);
      tr.append(td);
    });
    if (i === 0 && header) thead.append(tr);
    else tbody.append(tr);
  });
  if (thead.children.length) table.append(thead);
  table.append(tbody);
  const wrap = document.createElement('div');
  wrap.className = 'table-plain-scroll';
  wrap.append(table);
  block.replaceChildren(wrap);
}
