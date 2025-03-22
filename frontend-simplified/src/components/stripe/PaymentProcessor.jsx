import React, { useState, useEffect } from 'react';
import { useStripe, useElements, Elements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import './PaymentProcessor.css';

// Initialize Stripe outside of component to avoid recreating it on each render
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_51NxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');

const PaymentForm = ({ amount, currency = 'usd', connectedAccountId, description, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the component loads
    const createPaymentIntent = async () => {
      try {
        setLoading(true);
        // In a real app, this would call your backend API
        // For demo purposes, we're simulating a successful response
        setClientSecret('pi_simulated_secret');
      } catch (err) {
        setError('Failed to initialize payment. Please try again.');
        if (onError) onError('Payment setup failed');
      } finally {
        setLoading(false);
      }
    };

    if (amount && connectedAccountId) {
      createPaymentIntent();
    }
  }, [amount, currency, connectedAccountId, description, onError]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    // In a real app, this would confirm the payment with Stripe
    // For demo purposes, we're simulating a successful payment
    setTimeout(() => {
      setSucceeded(true);
      setLoading(false);
      if (onSuccess) onSuccess({ id: 'pi_simulated_payment', status: 'succeeded' });
    }, 2000);
  };

  const cardElementOptions = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    }
  };

  return (
    <div className="payment-form-container">
      {succeeded ? (
        <div className="payment-success">
          <h3>Payment Successful!</h3>
          <p>Thank you for your payment. Your transaction has been completed successfully.</p>
          <p>A confirmation has been sent to your email.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="payment-form">
          <h3>Complete Your Payment</h3>
          <div className="payment-details">
            <p>Amount: <strong>{(amount / 100).toFixed(2)} {currency.toUpperCase()}</strong></p>
            {description && <p>Description: {description}</p>}
          </div>
          
          <div className="form-group">
            <label>Card Details</label>
            <div className="card-element-container">
              <CardElement options={cardElementOptions} />
            </div>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button 
            type="submit" 
            disabled={loading || !stripe} 
            className="payment-button"
          >
            {loading ? 'Processing...' : `Pay ${(amount / 100).toFixed(2)} ${currency.toUpperCase()}`}
          </button>
          
          <div className="secure-badge">
            <span role="img" aria-label="lock">🔒</span> Payments are secure and encrypted
          </div>
        </form>
      )}
    </div>
  );
};

const PaymentProcessor = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm {...props} />
    </Elements>
  );
};

export default PaymentProcessor;
