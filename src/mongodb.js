const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = new Promise((resolve, reject) => {

    mongoose.connect(process.env.MONGODB_URI, (error) => {
        if (error) reject(error);
        else resolve(mongoose);
    });
});
