import React from 'react';
import Navbar from './Navbar';

const Subscription = () => {
  const plans = [
    { name: 'Basic', price: 49 },
    { name: 'Premium', price: 99 },
    { name: 'Green Pro', price: 149 }
  ];

  const subscribe = (plan) => {
    alert(`Subscribed to ${plan.name} plan!`);
    // payment logic here
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2>Subscription Plans</h2>
        <div style={styles.cards}>
          {plans.map((plan) => (
            <div key={plan.name} style={styles.card}>
              <h3>{plan.name}</h3>
              <p>₹{plan.price}/month</p>
              <button style={styles.button} onClick={() => subscribe(plan)}>
                Subscribe
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center'
  },
  cards: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'center'
  },
  card: {
    border: '1px solid #ccc',
    padding: '1.5rem',
    width: '200px',
    borderRadius: '8px'
  },
  button: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#2f855a',
    color: 'white',
    border: 'none',
    cursor: 'pointer'
  }
};

export default Subscription;
