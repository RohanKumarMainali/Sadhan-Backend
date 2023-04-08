const categoryRouter = require("express").Router();

const {
    postCategory,
    getCategory
} = require("../controller/index.controllers").categoryControllers;

categoryRouter.get("/getCategory", getCategory);
categoryRouter.post("/createCategory", postCategory);
//kycRouter.delete("/deleteCategory/:id",deleteCategory);
//kycRouter.put("/updateCategory/:id", updateCategory);

module.exports = categoryRouter;
