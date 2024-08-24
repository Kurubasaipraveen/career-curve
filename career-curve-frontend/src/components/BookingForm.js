import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingForm = () => {
    const { mentorId } = useParams();
    const navigate = useNavigate();
    const [mentor, setMentor] = useState(null);
    const [studentId, setStudentId] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [cost, setCost] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/mentors`)
            .then(response => {
                const selectedMentor = response.data.find(mentor => mentor.id === parseInt(mentorId));
                setMentor(selectedMentor);
                setCost(selectedMentor.is_premium ? 100 : 50);
            })
            .catch(error => console.error('Error fetching mentor:', error));
    }, [mentorId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/bookings', {
            student_id: studentId,
            mentor_id: mentor.id,
            time_slot: timeSlot,
            cost
        })
            .then(() => navigate('/payment', { state: { cost } }))
            .catch(error => console.error('Error creating booking:', error));
    };

    if (!mentor) return <div>Loading...</div>;

    return (
        <div>
            <h2>Book a Session with {mentor.name}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Student ID:</label>
                    <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
                </div>
                <div>
                    <label>Time Slot:</label>
                    <input type="text" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} required />
                </div>
                <div>
                    <label>Cost:</label>
                    <input type="text" value={cost} onChange={(e) => setCost(e.target.value)} readOnly />
                </div>
                <button type="submit">Book</button>
            </form>
        </div>
    );
};

export default BookingForm;
