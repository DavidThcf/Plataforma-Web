const Sequelize = require('sequelize');


function configConnection() {
    const sequelize = new Sequelize('pstt', 'postgres', 'NJpost2016', {
        host: 'knower.udenar.edu.co',
        dialect: 'postgres',
        define: {
            timestamps: false
        }
    });
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    return sequelize;
}

module.exports.configConnection=configConnection