module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
        mentorId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Mentors',
                key: 'id'
            },
            allowNull: false
        },
        studentId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Students',
                key: 'id'
            },
            allowNull: false
        },
        start_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_time: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });
    return Booking;
};
