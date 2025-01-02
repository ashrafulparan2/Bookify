import React from 'react';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import { useAuth } from '../../context/AuthContext';

const OrderPage = () => {
  const { currentUser } = useAuth();

  console.log("Current User", currentUser.email);
  const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser.email);

  if (isLoading)
    return <div style={styles.loading}>Loading your orders...</div>;
  if (isError)
    return <div style={styles.error}>Failed to load your orders. Please try again later.</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Orders</h2>
      {orders.length === 0 ? (
        <div style={styles.noOrders}>You have no orders yet. Start shopping now!</div>
      ) : (
        <div style={styles.ordersContainer}>
          {orders.map((order, index) => (
            <div key={order._id} style={styles.orderCard}>
              <div style={styles.cardHeader}>
                <p style={styles.orderIndex}>Order #{index + 1}</p>
                <p style={styles.orderId}>Order ID: {order._id}</p>
              </div>
              <div style={styles.cardBody}>
                <p style={styles.text}><strong>Name:</strong> {order.name}</p>
                <p style={styles.text}><strong>Email:</strong> {order.email}</p>
                <p style={styles.text}><strong>Phone:</strong> {order.phone}</p>
                <p style={styles.totalPrice}><strong>Total Price:</strong> TK. {order.totalPrice}</p>
                <h3 style={styles.subHeading}>Shipping Address</h3>
                <p style={styles.text}>
                  {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                </p>
                <h3 style={styles.subHeading}>Products</h3>
                <ul style={styles.productList}>
                  {order.productIds.map((productId) => (
                    <li key={productId} style={styles.productItem}>{productId}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: '#e1bee7', // Light Purple background
    borderRadius: '20px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    fontFamily: 'Poppins, sans-serif',
    animation: 'fadeIn 1s ease-in-out',
  },
  heading: {
    fontSize: '36px',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#7b1fa2', // Deep Purple color for the heading
    textAlign: 'center',
    // animation: 'typing 3s steps(30) 1s forwards, fadeInUp 1s ease-in-out',
  },
  noOrders: {
    textAlign: 'center',
    color: '#7b1fa2', // Deep Purple
    fontSize: '18px',
    padding: '15px',
    backgroundColor: '#e1bee7', // Light Purple background
    borderRadius: '8px',
    animation: 'fadeInUp 1s ease-in-out',
  },
  ordersContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    animation: 'fadeIn 2s ease-in-out',
  },
  orderCard: {
    border: '1px solid #f3e5f5', // Light Purple Border
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: '#ffffff',
    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
    animation: 'cardFlipIn 1s ease-out',
    cursor: 'pointer',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    borderBottom: '1px solid #f3e5f5', // Light Purple Border
    paddingBottom: '10px',
  },
  orderIndex: {
    fontSize: '16px',
    color: '#8e24aa', // Purple color for the index
    fontWeight: '600',
    animation: 'bounceIn 1s ease-out',
  },
  orderId: {
    fontSize: '18px',
    color: '#6a1b9a', // Dark Purple for the order ID
    fontWeight: '700',
  },
  cardBody: {
    padding: '10px 0',
  },
  text: {
    fontSize: '16px',
    color: '#4a148c', // Dark Purple color for text
    marginBottom: '8px',
  },
  totalPrice: {
    fontSize: '18px',
    color: '#7b1fa2', // Deep Purple for price
    fontWeight: '600',
    marginBottom: '10px',
  },
  subHeading: {
    fontSize: '18px',
    color: '#8e24aa', // Purple for subheadings
    fontWeight: '700',
    marginTop: '20px',
    marginBottom: '8px',
  },
  productList: {
    listStyle: 'disc inside',
    margin: '0',
    padding: '0',
    color: '#4a148c', // Dark Purple
  },
  productItem: {
    fontSize: '15px',
    color: '#7b1fa2', // Deep Purple for products
    padding: '5px 0',
  },
  loading: {
    fontSize: '18px',
    color: '#6a1b9a', // Dark Purple
    textAlign: 'center',
    padding: '30px',
    animation: 'fadeIn 2s ease-in-out',
  },
  error: {
    fontSize: '18px',
    color: '#d32f2f', // Red for error messages
    textAlign: 'center',
    padding: '30px',
  },
};

// Add animations to your global CSS or in a CSS file
const animationStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes cardFlipIn {
    from {
      transform: rotateY(-90deg);
      opacity: 0;
    }
    to {
      transform: rotateY(0deg);
      opacity: 1;
    }
  }

  @keyframes bounceIn {
    0% { transform: scale(0.5); opacity: 0; }
    50% { transform: scale(1.1); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }

  @keyframes typing {
    from { width: 0; }
    to { width: 100%; }
  }

  .order-card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    background-color: #f3e5f5; /* Light Purple Hover Effect */
  }

  .order-card:active {
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

// Inject animation styles into the DOM
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = animationStyles;
document.head.appendChild(styleSheet);

export default OrderPage;
