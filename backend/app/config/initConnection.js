const mongoose = require('mongoose');
module.exports = async function (connectionString) {

    mongoose.connect(connectionString)
        .then(
            () => { console.log('Database connection established sucessfullly!') })
        .catch(
            async err => {
                //maybe mongoDB container is slow to start
                await sleep(2500);
                mongoose.connect(connectionString)
                    .then(
                        () => { console.log('Database connection established sucessfullly!') })
                    .catch(
                        err => { throw err }
                    )

            })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
