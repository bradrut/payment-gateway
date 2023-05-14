import React from 'react';
import Image from 'next/image';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function PreviewPage() {
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  return (
    <form action="/api/stripe/checkout/sessions" method="POST">
      <section className='checkout-card'>
        <section className='product-wrapper flex flex-row'>
          <div className='product-image-wrapper'>
            <Image className='product-image drop-shadow'
              src='/HoneyLocust.jpg'
              fill='true'
              style={{ objectFit: 'cover', overflow: 'hidden' }}
              alt='Picture of Honey Locust tree leaves'/>
          </div>
          <div style={{ paddingTop: '11px', paddingLeft: '5px' }}>
            <p className='text-black font-sans font-semibold text-base'>Plant a tree (Honey Locust)</p>
            <p className='font-sans font-semibold text-sm text-slate-800'>$4.99</p>
          </div>
        </section>
        <button type="submit" role="link">
          Checkout
        </button>
      </section>
      <style jsx>
        {`
          .checkout-card {
            background: #EBEBEB;
            display: flex;
            flex-direction: column;
            width: 400px;
            height: 112px;
            border-radius: 6px;
            justify-content: space-between;
          }
          .product-wrapper {
            height: 76px;
          }
          .product-image-wrapper {
            position: relative;
            margin: 9px;
            width: 58px;
            height: 58px;
            overflow: hidden;
            border-radius: 3px;
          }
          button {
            height: 36px;
            background: #556cd6;
            border-radius: 4px;
            color: white;
            border: 0;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
            // margin-top: 76px;
          }
          button:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </form>
  );
}