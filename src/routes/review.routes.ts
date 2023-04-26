const reviewRouter = require("express").Router();

const {
    postReview,
    getReview
} = require("../controller/index.controllers").reviewControllers;

reviewRouter.get("/getReview", getReview);
reviewRouter.get("/getReview/:userId", getReview);
reviewRouter.get("/getReview/vehicle/:vehicleId", getReview);
reviewRouter.post("/postReview", postReview);
//categoryRouter.put("/updateCategory/:id", updateCategory);
//categoryRouter.delete("/deleteCategory/:id", deleteCategory);
//kycRouter.put("/updateCategory/:id", updateCategory);

module.exports = reviewRouter;
