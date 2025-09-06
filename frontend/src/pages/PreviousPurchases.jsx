import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PreviousPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const purchaseHistory = JSON.parse(localStorage.getItem('purchases') || '[]');
    setPurchases(purchaseHistory);
  }, []);

  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <button onClick={() => navigate('/')} className="back-btn">← Back</button>
          <h1>🌱 EcoFinds - Purchase History</h1>
        </div>
      </header>

      <div className="purchases-container">
        {purchases.length === 0 ? (
          <div className="no-purchases">
            <p>You haven't made any purchases yet</p>
            <button onClick={() => navigate('/')} className="continue-shopping-btn">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="purchases-list">
            {purchases.map(purchase => (
              <div key={purchase.id} className="purchase-card">
                <div className="purchase-header">
                  <h3>Order #{purchase.id}</h3>
                  <p className="purchase-date">
                    {new Date(purchase.date).toLocaleDateString()}
                  </p>
                  <p className="purchase-total">Total: ${purchase.total}</p>
                </div>
                
                <div className="purchase-items">
                  {purchase.items.map(item => (
                    <div key={item.id} className="purchase-item">
                      <div className="purchase-item-image">
                        {item.image ? (
                          <img src={item.image} alt={item.title} />
                        ) : (
                          <div className="placeholder-image">📷</div>
                        )}
                      </div>
                      <div className="purchase-item-info">
                        <h4>{item.title}</h4>
                        <p className="purchase-item-category">{item.category}</p>
                        <p className="purchase-item-details">
                          ${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviousPurchases;
