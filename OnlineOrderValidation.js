const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
  e.preventDefault(); // prevent default form submission

  // validate form fields
  const name = form.querySelector('#name').value;
  const email = form.querySelector('#email').value;
  const phone = form.querySelector('#phone').value;
  const address = form.querySelector('#address').value;
  const deliveryTime = form.querySelector('#delivery-time').value;
  const orderDetails = form.querySelector('#order-details').value;

  if (!name || !email || !phone || !address || !deliveryTime || !orderDetails) {
    alert('Please fill out all required fields.');
    return;
  }
});