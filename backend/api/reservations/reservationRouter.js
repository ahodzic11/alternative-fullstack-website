const { creatReservation, getReservations, deleteReservation } = require("./reservationController");
const router = require("express").Router();

router.post("/", creatReservation);
router.get("/", getReservations);
router.delete("/:id", deleteReservation);

module.exports = router;
