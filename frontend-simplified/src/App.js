import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import Stripe components
import PaymentProcessor from './components/stripe/PaymentProcessor';
import OnboardingFlow from './components/stripe/OnboardingFlow';
import PaymentStatus from './components/stripe/PaymentStatus';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to FuseIQ</h1>
      <p>A platform connecting freelancers with clients</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="logo">FuseIQ</div>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/connect">Connect Stripe</a></li>
              <li><a href="/payment">Make Payment</a></li>
              <li><a href="/status">Account Status</a></li>
            </ul>
          </nav>
        </header>
        
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/connect" element={<OnboardingFlow userId="test_user" userEmail="test@example.com" userName="Test User" />} />
            <Route path="/payment" element={
              <div className="payment-page">
                <h2>Make a Payment</h2>
                <PaymentProcessor 
                  amount={2500} 
                  currency="usd" 
                  connectedAccountId="acct_example" 
                  description="Payment for services" 
                />
              </div>
            } />
            <Route path="/status" element={
              <div className="status-page">
                <h2>Account Status</h2>
                <PaymentStatus accountId="acct_example" />
              </div>
            } />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <p>&copy; {new Date().getFullYear()} FuseIQ. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
