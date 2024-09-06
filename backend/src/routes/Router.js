const express = require("express");
const router = express();

router.use("/api/users", require("./UserRouter"));
router.use("/api/photos", require("./PhotoRoutes"));

// test route
router.get("/", (req, res) => {
    res.send("Api funcionando!");
});

module.exports = router;