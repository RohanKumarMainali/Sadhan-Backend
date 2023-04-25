const reviewRouter = require("express").Router();

const {
    postReview,
} = require("../controller/index.controllers").reviewControllers;

//categoryRouter.get("/getCategory", getCategory);
//categoryRouter.get("/getCategory/:id", getCategory);
reviewRouter.post("/postReview", postReview);
//categoryRouter.put("/updateCategory/:id", updateCategory);
//categoryRouter.delete("/deleteCategory/:id", deleteCategory);
//kycRouter.put("/updateCategory/:id", updateCategory);

module.exports = reviewRouter;
