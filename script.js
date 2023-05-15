// Get all hyperlinks with class "modal-link"
var modalLinks = document.querySelectorAll('.modal-link');

// Loop through all hyperlinks and add click event listener
for (var i = 0; i < modalLinks.length; i++) {
  modalLinks[i].addEventListener('click', function(event) {
    event.preventDefault();

    // Get the href attribute of the clicked hyperlink
    var href = this.getAttribute('href');

    // Create the modal background and box elements
    var modalBg = document.createElement('div');
    modalBg.classList.add('modal-background');
    var modalBox = document.createElement('div');
    modalBox.classList.add('modal-box');

    // Create the close button element
    var closeBtn = document.createElement('span');
    closeBtn.classList.add('modal-close');
    closeBtn.innerHTML = '&times;';

    // Create the iframe element
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', href);
    iframe.style.width = '100%';
    iframe.style.height = '80vh';

    // Append the elements to the modal box and body
    modalBox.appendChild(closeBtn);
    modalBox.appendChild(iframe);
    document.body.appendChild(modalBg);
    document.body.appendChild(modalBox);

    // Add click event listener to close button and modal background
    //closeBtn.addEventListener('click', closeModal);
    modalBg.addEventListener('click', closeModal);

    // Function to close the modal box
    function closeModal() {
      modalBg.remove();
      modalBox.remove();
    }
    
    // Show the modal box
    modalBox.style.display = 'block';
    modalBg.style.display = 'block';
  });
}
