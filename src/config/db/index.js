const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/education');
        console.log('Connect database success!');
    } catch (error) {
        console.log('Fail!');
    }
}

module.exports = { connect };
