const router = require("express").Router();
const courseRoutes = require("./courseRoutes");
const studentRoutes = require("./studentRoutes");

router.use("/thoughts", thoughtRoutes);
router.use("/users", userRoutes);

module.exports = router;
