const categoryRouter = require("express").Router();

const {
    postCategory,
    getCategory,
    deleteCategory
} = require("../controller/index.controllers").categoryControllers;

categoryRouter.get("/getCategory", getCategory);
categoryRouter.post("/createCategory", postCategory);
categoryRouter.delete("/deleteCategory/:id", deleteCategory);
//kycRouter.put("/updateCategory/:id", updateCategory);

module.exports = categoryRouter;
