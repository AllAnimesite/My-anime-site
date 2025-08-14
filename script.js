 // Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get all buttons with the class 'select-plan'
    const selectButtons = document.querySelectorAll('.select-plan');

    // Loop through each button and add a click event listener
    selectButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Get the value of the data-plan attribute
            const selectedPlan = this.getAttribute('data-plan');

            // Store the selected plan in localStorage (optional)
            localStorage.setItem('selectedPlan', selectedPlan);

            // Show confirmation or redirect (you can customize this)
            alert(`You selected the ${selectedPlan} plan!`);

            // Optional: Redirect to a new page
            // window.location.href = 'payment.html';
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const selectButtons = document.querySelectorAll('.select-plan');

    selectButtons.forEach(button => {
        button.addEventListener('click', function () {
            const selectedPlan = this.getAttribute('data-plan');

            // Save the selected plan
            localStorage.setItem('selectedPlan', selectedPlan);

            // Redirect to payment page
            window.location.href = 'payment.html';
        });
    });
});
function proceedToCheckout() {
  window.location.href = 'checkout.html';
}
// Show details in checkout page
if (document.getElementById('checkout-plan')) {
    const planName = localStorage.getItem('selectedPlan');
    const price = localStorage.getItem('selectedPrice');
    const method = localStorage.getItem('paymentMethod');

    document.getElementById('checkout-plan').textContent = planName || 'Not selected';
    document.getElementById('checkout-price').textContent = price || 'Not available';
    document.getElementById('checkout-method').textContent = method || 'Not selected';
}
