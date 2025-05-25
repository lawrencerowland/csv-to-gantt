import { unlockDownloads } from './script.js';

const stripe = Stripe('pk_live_REPLACE_ME'); // TODO: replace with your publishable key

document.getElementById('payButton').addEventListener('click', async () => {
  const { error } = await stripe.redirectToCheckout({
    lineItems: [{ price: 'price_REPLACE_ME', quantity: 1 }],
    mode: 'payment',
    successUrl: window.location.href + '?paid=true',
    cancelUrl: window.location.href
  });
  if (error) alert(error.message);
});

// Unlock downloads if returning from Stripe
if (new URLSearchParams(window.location.search).get('paid') === 'true') {
  unlockDownloads();
}
