const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite:careerCarve.db');


const Mentor = require('./models/mentor')(sequelize, DataTypes);
const Student = require('./models/student')(sequelize, DataTypes);
const Booking = require('./models/booking')(sequelize, DataTypes);

const app = express();
app.use(cors()); 
app.use(bodyParser.json());

const seedDefaultMentors = async () => {
   
    await Mentor.destroy({ where: {} });

    const defaultMentors = [
        {
            name: 'Praveen',
            availability: JSON.stringify(['Monday 9-11am', 'Wednesday 1-3pm']),
            areas_of_expertise: JSON.stringify(['JavaScript', 'React']),
            is_premium: true
        },
        {
            name: 'Jane',
            availability: JSON.stringify(['Tuesday 10-12am', 'Thursday 2-4pm']),
            areas_of_expertise: JSON.stringify(['Python', 'Data Science']),
            is_premium: false
        },
        {
            name: 'Sai',
            availability: JSON.stringify(['Friday 1-3pm', 'Saturday 10-12am']),
            areas_of_expertise: JSON.stringify(['Java', 'Spring Boot']),
            is_premium: true
        },
        {
            name: 'Vandana',
            availability: JSON.stringify(['Friday 2-4pm', 'Saturday 11-1pm']),
            areas_of_expertise: JSON.stringify(['CSS', 'Bootstrap']),
            is_premium: false
        }
    ];
    
    for (const mentor of defaultMentors) {
        await Mentor.findOrCreate({ where: { name: mentor.name }, defaults: mentor });
    }

    console.log('Default mentors added');
};

sequelize.sync().then(async () => {
    console.log('Database synchronized');
    await seedDefaultMentors();
});


app.get('/mentors', async (req, res) => {
    try {
        const mentors = await Mentor.findAll();
        res.json(mentors);
    } catch (error) {
        res.status(500).send('Error fetching mentors');
    }
});

app.post('/bookings', async (req, res) => {
    try {
        const { mentorId, studentId, start_time, end_time } = req.body;
        const booking = await Booking.create({
            mentorId,
            studentId,
            start_time,
            end_time
        });
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).send('Error creating booking');
    }
});

app.get('/bookings/student/:id', async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            where: {
                studentId: req.params.id
            }
        });
        res.json(bookings);
    } catch (error) {
        res.status(500).send('Error fetching bookings for student');
    }
});

app.get('/bookings/mentor/:id', async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            where: {
                mentorId: req.params.id
            }
        });
        res.json(bookings);
    } catch (error) {
        res.status(500).send('Error fetching bookings for mentor');
    }
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
