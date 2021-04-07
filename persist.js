const mongoose = require('mongoose');
const { on } = require('./server');
const db = mongoose.connection


function connect(host, db_name) {
    mongoose.connect(
            `mongodb://${host}/${db_name}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        ).catch((err) => {
            console.log(err)
        })
}

function onConnect(callback) {
    db.once('open', function() {
      callback()
    });
}

module.exports = {
    "connect": connect,
    "onConnect": onConnect,
}