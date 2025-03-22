import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PaymentStatus.css';

const PaymentStatus = ({ accountId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accountStatus, setAccountStatus] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchAccountStatus = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // In a real app, this would call your backend API
        // For demo purposes, we're simulating a successful response
        setTimeout(() => {
          setAccountStatus({
            id: accountId,
            chargesEnabled: true,
            payoutsEnabled: true,
            detailsSubmitted: true,
            requirements: {
              currentlyDue: [],
              eventuallyDue: [],
              pendingVerification: []
            }
          });
          
          setBalance({
            available: [
              { amount: 12500, currency: 'usd' }
            ],
            pending: [
              { amount: 5000, currency: 'usd' }
            ]
          });
          
          setLoading(false);
        }, 1500);
      } catch (err) {
        setError('Failed to fetch account status. Please try again.');
        setLoading(false);
      }
    };

    if (accountId) {
      fetchAccountStatus();
    }
  }, [accountId]);

  if (loading) {
    return (
      <div className="status-container">
        <div className="status-card">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading account information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-container">
        <div className="status-card">
          <div className="error-message">{error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="status-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="status-container">
      <div className="status-card">
        <h2>Account Status</h2>
        
        <div className="status-section">
          <h3>Verification Status</h3>
          <div className="status-item">
            <span className="status-label">Account ID:</span>
            <span className="status-value">{accountStatus.id}</span>
          </div>
          <div className="status-item">
            <span className="status-label">Charges Enabled:</span>
            <span className={`status-value ${accountStatus.chargesEnabled ? 'status-success' : 'status-pending'}`}>
              {accountStatus.chargesEnabled ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="status-item">
            <span className="status-label">Payouts Enabled:</span>
            <span className={`status-value ${accountStatus.payoutsEnabled ? 'status-success' : 'status-pending'}`}>
              {accountStatus.payoutsEnabled ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="status-item">
            <span className="status-label">Details Submitted:</span>
            <span className={`status-value ${accountStatus.detailsSubmitted ? 'status-success' : 'status-pending'}`}>
              {accountStatus.detailsSubmitted ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
        
        {accountStatus.requirements.currentlyDue.length > 0 && (
          <div className="status-section">
            <h3>Required Information</h3>
            <ul className="requirements-list">
              {accountStatus.requirements.currentlyDue.map((item, index) => (
                <li key={index} className="requirement-item">{item}</li>
              ))}
            </ul>
            <button className="status-button">Complete Requirements</button>
          </div>
        )}
        
        <div className="status-section">
          <h3>Balance</h3>
          {balance.available.map((item, index) => (
            <div key={`available-${index}`} className="balance-item">
              <span className="balance-label">Available:</span>
              <span className="balance-value">${(item.amount / 100).toFixed(2)} {item.currency.toUpperCase()}</span>
            </div>
          ))}
          {balance.pending.map((item, index) => (
            <div key={`pending-${index}`} className="balance-item">
              <span className="balance-label">Pending:</span>
              <span className="balance-value pending">${(item.amount / 100).toFixed(2)} {item.currency.toUpperCase()}</span>
            </div>
          ))}
        </div>
        
        <div className="status-actions">
          <button className="status-button">Update Account Information</button>
          <button className="status-button secondary">View Payout History</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;
