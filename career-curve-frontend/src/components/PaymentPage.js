import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentPage = () => {
    const location = useLocation();
    const { cost } = location.state || { cost: 0 };

    return (
        <div>
            <h2>Payment Page</h2>
            <p>Total Cost: ${cost}</p>
            <button onClick={() => alert('Payment Successful!')}>Confirm Payment</button>
        </div>
    );
};

export default PaymentPage;
