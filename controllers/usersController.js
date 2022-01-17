const fs = require('fs');

let data = JSON.parse(fs.readFileSync('./db.json').toString())
module.exports = {
    getData: (req, res) => {
        res.status(200).send(data.users)
    }
}