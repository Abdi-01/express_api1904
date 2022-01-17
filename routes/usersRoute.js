const express = require("express");
const router = express.Router(); // menggunakan express router untuk konfigurasi routing
// import file controller
const { usersController } = require("../controllers");


router.get("/get-users", usersController.getData);

module.exports = router;