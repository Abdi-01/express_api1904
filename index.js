const express = require('express'); // import module express js
const app = express(); // untuk mengaktifkan/menjalankan fungsi module express
const fs = require('fs')
const PORT = 2500;

// import data json
const data = JSON.parse(fs.readFileSync("./db.json"))

// konfigurasi untuk dapat menerima data req.body dari user/client/front-end
app.use(express.json());

// import routing api configuration
const { usersRoute, productsRoute } = require('./routes')

app.use('/users', usersRoute);
app.use('/products', productsRoute);

// untuk menerima req dari client
app.get("/", (req, res) => {
    res.status(200).send('<h1>Welcome to Express API</h1>')
})

// app.get("/users/:id", (req, res) => {
//     // cara menerima data dari req FE
//     console.log("data dari req.query :", req.query)
//     console.log("data dari req.body :", req.body)
//     console.log("data dari req.params :", req.params)
//     res.status(200).send({
//         id: 1,
//         username: "Nakajima"
//     })
// })

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