const express = require('express'); // import module express js
const app = express(); // untuk mengaktifkan/menjalankan fungsi module express
const fs = require('fs')
const PORT = 2500;

// import data json
const data = JSON.parse(fs.readFileSync("./db.json"))

// konfigurasi untuk dapat menerima data req.body dari user/client/front-end
app.use(express.json());

// untuk menerima req dari client
app.get("/", (req, res) => {
    res.status(200).send('<h1>Welcome to Express API</h1>')
})

app.get("/users/:id", (req, res) => {
    // cara menerima data dari req FE
    console.log("data dari req.query :", req.query)
    console.log("data dari req.body :", req.body)
    console.log("data dari req.params :", req.params)
    res.status(200).send({
        id: 1,
        username: "Nakajima"
    })
})

// 1. untuk get products : id(int), name, harga(int), qty(int)

app.get('/products', (req, res) => {

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
})

let alamat = ``;

for (let prop in data) {
    alamat += `http://localhost:${PORT}/${prop} \n`
}

// mengaktifkan koneksi express api untuk bisa menerima request
app.listen(PORT, () => console.log(`Express API Server :

Home :
http://localhost:${PORT}

Resources :
${alamat}

Enjoy the API 😁
`,))