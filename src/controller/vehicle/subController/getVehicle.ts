const vehicleModel = require("../../../models/vehicle.model");
const reviewModel = require("../../../models/review.model");
import { NextFunction, Request, Response } from "express";

const getVehicle = async (req: Request, res: Response, next: NextFunction) => {
  // to get vehicle with the reviews calculated,

  const pipeline = [
    {
      $group: {
        _id: "$vehicleId",
        reviewCount: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ];
  try {
    const reviews = await reviewModel.aggregate(pipeline);
    const id = req.params.id;
    if (id == undefined) {
      // get all vehicle
      const response = await vehicleModel.find({});
      const vehicleData = response.map((item: any) => {
        const vehicleReviews = reviews.filter((review: any) =>
          review._id.equals(item._id)
        );

        const reviewCount =
          vehicleReviews.length > 0 ? vehicleReviews[0].reviewCount : 0;
        const avgRating =
          vehicleReviews.length > 0 ? vehicleReviews[0].avgRating : 0;

        return {
          _id: item._id,
          userId: item.userId,
          name: item.name,
          price: item.price,
          model: item.model,
          milage: item.milage,
          seat: item.seat,
          vehicleNumber: item.vehicleNumber,
          location: item.location,
          description: item.description,
          status: item.status,
          categoryId: item.categoryId,
          categoryName: item.categoryName,
          carImages: item.carImages,
          bluebookImage: item.bluebookImage,
          insuranceImage: item.insuranceImage,
          reviewCount,
          avgRating,
        };
      });
      return res.status(200).send({ success: true, vehicles: vehicleData });
    }
    // if id is given
    const response = await vehicleModel.findById(id);
    const test = [];
    await test.push(response);
    return res.status(200).send({ data: test });
  } catch (error) {
    next(error);
  }
};

module.exports = getVehicle;
