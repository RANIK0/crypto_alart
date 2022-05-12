const Controller = require("./controller");
const express = require("express");

const router = express.Router();


router.get("/api/prices", Controller.CurrentPrice);

router.get("/api/alerts", Controller.GetAlerts);

router.post("/api/alert", Controller.CreateAlert);

router.post("/api/updatealerts", Controller.UpdateAlerts);


module.exports = router;
