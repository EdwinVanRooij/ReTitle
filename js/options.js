let ul = document.getElementsByTagName('ul')[0];
chrome.storage.sync.get(function (items) {
  for (let url in items) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    if (!url.startsWith('*')) {
      a.href = url;
    } else {
      a.href = '#';
    }
    let rm = document.createElement('div');
    rm.className = 'remove';
    li.id = url;
    rm.addEventListener('click', function(e) {
      e.preventDefault();
      chrome.storage.sync.remove(url);
      document.getElementById(url).remove();
    });
    rm.appendChild(document.createTextNode('remove'));
    a.appendChild(document.createTextNode(url));
    li.appendChild(a);
    li.appendChild(document.createTextNode(`: ${items[url]['title']}`));
    li.appendChild(rm);
    ul.appendChild(li);
  }
});

