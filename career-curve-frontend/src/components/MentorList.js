import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/MentorList.css';

const MentorList = () => {
    const [mentors, setMentors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/mentors')
            .then(response => {
                const parsedMentors = response.data.map(mentor => ({
                    ...mentor,
                    availability: Array.isArray(mentor.availability) ? mentor.availability : parseJSON(mentor.availability),
                    areas_of_expertise: Array.isArray(mentor.areas_of_expertise) ? mentor.areas_of_expertise : parseJSON(mentor.areas_of_expertise),
                }));
                setMentors(parsedMentors);
            })
            .catch(error => {
                console.error('Error fetching mentors:', error);
            });
    }, []);

    const handleSelectMentor = (mentorId) => {
        navigate(`/book/${mentorId}`);
    };

    const parseJSON = (jsonString) => {
        try {
            return JSON.parse(jsonString);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return []; // Return an empty array if JSON parsing fails
        }
    };

    return (
        <div>
            <h2>Mentors</h2>
            <ul>
                {mentors.length > 0 ? (
                    mentors.map(mentor => (
                        <li key={mentor.id} onClick={() => handleSelectMentor(mentor.id)}>
                            <div>
                                <strong>Name:</strong> {mentor.name}
                            </div>
                            <div>
                                <strong>Type:</strong> {mentor.is_premium ? 'Premium' : 'Standard'}
                            </div>
                            <div>
                                <strong>Availability:</strong>
                                <ul>
                                    {Array.isArray(mentor.availability) && mentor.availability.length > 0 ? (
                                        mentor.availability.map((slot, index) => (
                                            <li key={index}>{slot}</li>
                                        ))
                                    ) : (
                                        <li>No slots available</li>
                                    )}
                                </ul>
                            </div>
                            <div>
                                <strong>Areas of Expertise:</strong>
                                <ul>
                                    {Array.isArray(mentor.areas_of_expertise) && mentor.areas_of_expertise.length > 0 ? (
                                        mentor.areas_of_expertise.map((area, index) => (
                                            <li key={index}>{area}</li>
                                        ))
                                    ) : (
                                        <li>No areas listed</li>
                                    )}
                                </ul>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No mentors available</p>
                )}
            </ul>
        </div>
    );
};

export default MentorList;
