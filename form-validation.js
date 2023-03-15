// Get form elements
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const addressInput = document.getElementById('address');
const deliveryTimeInput = document.getElementById('delivery-time');
const orderDetailsInput = document.getElementById('order-details');

// Add event listeners to inputs
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
phoneInput.addEventListener('input', validatePhone);
addressInput.addEventListener('input', validateAddress);
deliveryTimeInput.addEventListener('input', validateDeliveryTime);
orderDetailsInput.addEventListener('input', validateOrderDetails);

// Define validation functions
function validateName() {
  const name = nameInput.value;
  if (name.trim() === '') {
    alert('Please enter your name');
  }
}

function validateEmail() {
  const email = emailInput.value;
  if (!isValidEmail(email)) {
    alert('Please enter a valid email address');
  }
}

function validatePhone() {
  const phone = phoneInput.value;
  if (!isValidPhone(phone)) {
    alert('Please enter a valid phone number');
  }
}

function validateAddress() {
  const address = addressInput.value;
  if (address.trim() === '') {
    alert('Please enter your address');
  }
}

function validateDeliveryTime() {
  const deliveryTime = deliveryTimeInput.value;
  if (!isValidDeliveryTime(deliveryTime)) {
    alert('Please enter a valid delivery time');
  }
}

function validateOrderDetails() {
  const orderDetails = orderDetailsInput.value;
  if (orderDetails.trim() === '') {
    alert('Please enter your order details');
  }
}

// Define helper functions for validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
}

function isValidDeliveryTime(deliveryTime) {
  const deliveryTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
  return deliveryTimeRegex.test(deliveryTime);
}