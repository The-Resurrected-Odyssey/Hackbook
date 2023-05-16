const createModalBox = function(href) {
  const modalBg = document.createElement('div');
  modalBg.classList.add('modal-background');
  const modalBox = document.createElement('div');
  modalBox.classList.add('modal-box');

  const closeBtn = document.createElement('span');
  closeBtn.classList.add('modal-close');
  closeBtn.innerHTML = '&times;';

  const iframe = document.createElement('iframe');
  iframe.setAttribute('src', href);
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allowfullscreen', true);

  const width = Math.min(window.innerWidth * 0.9, 16 / 9 * window.innerHeight * 0.9);
  const height = width / 16 * 9;

  iframe.style.width = `${width}px`;
  iframe.style.height = `${height}px`;
  iframe.style.position = 'absolute';
  iframe.style.top = '50%';
  iframe.style.left = '50%';
  iframe.style.transform = 'translate(-50%, -50%)';

  modalBox.appendChild(closeBtn);
  modalBox.appendChild(iframe);
  document.body.appendChild(modalBg);
  document.body.appendChild(modalBox);


  function closeModal() {
    modalBg.removeEventListener('click', closeModal);
    closeBtn.removeEventListener('click', closeModal);
    modalBg.remove();
    modalBox.remove();
  }


  closeBtn.addEventListener('click', closeModal);
  modalBg.addEventListener('click', closeModal);


  modalBox.style.display = 'block';
  modalBg.style.display = 'block';
};


const loadJSON = function(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.overrideMimeType('application/json');
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  };
  xhr.send(null);
};


const createTable = function(data, elementID) {
  let text = '<table>';
  for (let i in data) {
    text += `<tr><td><a href="#" class="modal-link" data-href="${data[i].url}">${data[i].name}</a></td></tr>`;
  }
  text += '</table>';
  document.getElementById(elementID).innerHTML = text;

  const modalLinks = document.querySelectorAll(`#${elementID} .modal-link`);

  modalLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      createModalBox(link.getAttribute('data-href'));
    });
  });
};


const files = ['tools/web.json', 'tools/crypto.json', 'tools/network.json', 'tools/forensic.json', 'tools/osint.json', 'tools/steg.json', 'tools/misc.json', 'tools/framework.json', 'tools/rev-pwn.json'];
files.forEach(function(file) {
  loadJSON(file, function(data) {
    const elementID = file.split('/')[1].split('.')[0];
    createTable(data, elementID); 
  });
});
