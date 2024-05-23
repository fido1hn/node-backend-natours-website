import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51PJ4QUAmpiG9J1kb5Z3ilkkts0LFITuw3OpcB7WfG8az0Te4mV7B8wDn1KjUkT4wnK4XGwyzRKKUEX57vPdClueO008AMI2IYi',
);

export const bookTour = async (tourId) => {
  try {
    // 1.) Get checkout session from API
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`,
    );
    console.log(session);
    // 2.) Create checkout form + charge credit card
    window.location.assign(session.data.session.url);
  } catch (err) {
    showAlert('error', err);
  }
};
