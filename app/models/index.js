const fs = require('fs');
const config = require('../../config');
const path = require('path');
const db = {};

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.database, config.user, config.password, config);

fs.readdirSync(__dirname)
    .filter(file => file !== 'index.js')
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.values(db)
    .filter(model => model.associate)
    .forEach(model => model.associate(db));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
