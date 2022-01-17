const fs = require('fs');

module.exports = {
    getData: (req, res) => {
        let data = JSON.parse(fs.readFileSync('./db.json').toString())
        res.status(200).send(data.users)
    }
}