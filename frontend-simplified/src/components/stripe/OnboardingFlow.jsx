import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OnboardingFlow.css';

const OnboardingFlow = ({ userId, userEmail, userName }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [onboardingUrl, setOnboardingUrl] = useState(null);
  const [step, setStep] = useState(1);

  const createConnectAccount = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would call your backend API
      // For demo purposes, we're simulating a successful response
      setTimeout(() => {
        setAccountId('acct_simulated');
        setStep(2);
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError('Failed to create Stripe Connect account. Please try again.');
      setLoading(false);
    }
  };

  const generateOnboardingLink = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would call your backend API
      // For demo purposes, we're simulating a successful response
      setTimeout(() => {
        setOnboardingUrl('https://connect.stripe.com/setup/s/simulated-onboarding-link');
        setStep(3);
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError('Failed to generate onboarding link. Please try again.');
      setLoading(false);
    }
  };

  const handleStartOnboarding = () => {
    createConnectAccount();
  };

  const handleContinueToStripe = () => {
    generateOnboardingLink();
  };

  const handleGoToStripe = () => {
    // In a real app, this would redirect to the Stripe onboarding URL
    window.open(onboardingUrl, '_blank');
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        <h2>Connect with Stripe</h2>
        
        <div className="steps-container">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Start Onboarding</h3>
              <p>Create your Stripe Connect account to receive payments through FuseIQ.</p>
              {step === 1 && (
                <button 
                  onClick={handleStartOnboarding} 
                  disabled={loading}
                  className="onboarding-button"
                >
                  {loading ? 'Creating Account...' : 'Start Onboarding'}
                </button>
              )}
            </div>
          </div>
          
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Generate Onboarding Link</h3>
              <p>We'll create a secure link to Stripe's onboarding process.</p>
              {step === 2 && (
                <button 
                  onClick={handleContinueToStripe} 
                  disabled={loading}
                  className="onboarding-button"
                >
                  {loading ? 'Generating Link...' : 'Continue to Stripe'}
                </button>
              )}
            </div>
          </div>
          
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Complete Stripe Verification</h3>
              <p>Finish setting up your account on Stripe's secure platform.</p>
              {step === 3 && (
                <button 
                  onClick={handleGoToStripe}
                  className="onboarding-button stripe-button"
                >
                  Go to Stripe
                </button>
              )}
            </div>
          </div>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="onboarding-info">
          <h4>Why connect with Stripe?</h4>
          <ul>
            <li>Receive payments securely from clients worldwide</li>
            <li>Get paid directly to your bank account</li>
            <li>Manage your earnings and payment history</li>
            <li>Industry-leading security and fraud prevention</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
