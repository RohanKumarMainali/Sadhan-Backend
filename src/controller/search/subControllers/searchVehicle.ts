const vehicleModel = require("../../../models/vehicle.model");
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

const searchVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, location } = req.query;

  try {
    const agg = [
      {
        $search: {
          autocomplete: {
            query: name,
            path: "name",
            fuzzy: {
              maxEdits: 1,
            },
          },
        },
      },
      { $limit: 5 },
    ];

    const response = await vehicleModel.aggregate(agg);
    return res.status(200).send({ data: response });
  } catch (error:any) {

      return res.status(400).send({error: error.message})

  }
};

module.exports = searchVehicle
