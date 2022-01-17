
const fs = require('fs');
let data = JSON.parse(fs.readFileSync('./db.json').toString())

module.exports = {
    getData: (req, res) => {
        let filter = data.products.filter((val, index) => {
            let filterProp = [];// menampung adanya properti yang sama atau tidak
            let filterData = [];// menampung adanya data yang sama atau tidak
            for (let prop in val) {
                for (let queryProp in req.query) {
                    // memeriksa apakah properti dari req.query sama dengan properti
                    // yang ada pada data.products 
                    if (val[queryProp]) {
                        // jika properti req.query dimiliki juga oleh data products
                        // , proses filtering data di jalankan
                        if (queryProp == prop) {
                            if (req.query[queryProp] == val[prop]) {
                                filterData.push(true)
                            } else {
                                filterData.push(false)
                            }
                        }
                    } else {
                        // jika tidak, di anggap false dan dimasukkan kedalam filterProp
                        filterProp.push(false)
                    }
                }
            }
            console.log(index, filterData)
            // Jika filterProp memiliki data false
            if (filterProp.includes(false)) {
                // maka data dianggap tidak ada sehingga memberikan return false
                return false
            } else {
                // Jika filterProp tidak memiliki data false
                // proses filter data dilanjutkan
                return filterData.includes(false) ? false : true
            }
        });

        res.status(200).send(filter)
    },
    deleteData: (req, res) => {
        let idxData = data.products.findIndex(val => val.id == req.params.id);

        if (idxData >= 0) {
            data.products.splice(idxData, 1)
            fs.writeFileSync('./db.json', JSON.stringify(data));

            res.status(200).send({
                message: "Delete Success",
                success: true,
                data: data.products,
                deleteId: req.params.id
            })
        } else {
            res.status(400).send({
                message: "Data Not Found",
                success: false,
                deleteId: null
            })
        }
    }
}