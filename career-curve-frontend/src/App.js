import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MentorList from './components/MentorList';
import BookingForm from './components/BookingForm';
import PaymentPage from './components/PaymentPage';
import './App.css'
function App() {
    return (
        <Router>
            <div>
                <h1>CareerCarve Booking System</h1>
                <Routes>
                    <Route path="/" element={<MentorList />} />
                    <Route path="/book/:mentorId" element={<BookingForm />} />
                    <Route path="/payment" element={<PaymentPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
