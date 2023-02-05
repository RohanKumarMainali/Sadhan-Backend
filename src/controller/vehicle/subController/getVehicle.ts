const vehicleModel = require("../../../models/vehicle.model");
import { NextFunction, Request, Response } from "express";


const getVehicle = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const id = req.params.id;
        if (id == undefined) {
            // get all user
            const response = await vehicleModel.find({});
            return res.status(200).send({ success: true, vehicles: response });

        }
        // if id is given
        const response = await vehicleModel.findById(id);
        const test = [];
        await test.push(response);
        return res.status(200).send({ data: test })

    } catch (error) {
        next(error)

    }
}

module.exports = getVehicle
