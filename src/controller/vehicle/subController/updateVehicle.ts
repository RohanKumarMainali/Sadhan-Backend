import { Request, Response, NextFunction } from "express";

const vehicleModel = require("../../../models/vehicle.model");
const cloudinary = require("../../../utils/cloudinary");
interface imageType {
  carImage: Array<{}>;
  bluebook: string;
  insurance: string;
}
const updateVehicle = async (req: any, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const updateInfo = req.body;
  if (id == undefined)
    return res
      .status(400)
      .send({ success: false, message: "Please provide valid vahicle id!" });

  // for images
  let imageResults = undefined;
  const carImages = req?.files?.carImages;
  let results;

  try {
    // for array image
    // image -- process
    const images = req?.files?.image;
    console.log("images " + images);

    // for multiple images
    let results: any;
    let uploadPromises: Promise<any>[];
    if (images !== undefined) {
      if (Array.isArray(images)) {
        uploadPromises = images.map(async (image: any) => {
          console.log("image: ", image);
          const result = await cloudinary.uploader.upload(
            image?.tempFilePath,
            { folder: "car_images" },
            function (err: any, success: any) {
              if (err) {
                console.log(err);
              }
            }
          );
          return { public_id: result.public_id, url: result.secure_url };
        });
      } else {
        uploadPromises = [
          cloudinary.uploader
            .upload(
              images?.tempFilePath,
              { folder: "car_images" },
              function (err: any, success: any) {
                if (err) {
                  console.log(err);
                }
              }
            )
            .then((result: any) => ({
              public_id: result.public_id,
              url: result.secure_url,
            })),
        ];
      }
      results = await Promise.all(uploadPromises);
    }

    updateInfo.carImages = results;
    console.log("multiple image " + results);

    // bluebookImage

    if (req?.files?.bluebookImage) {
      const bluebookImageResponse = await cloudinary.uploader.upload(
        req.files.bluebookImage?.tempFilePath,
        { folder: "bluebook_images" },
        function (err: any, success: any) {
          if (err) {
            console.log(err);
          }
        }
      );
      updateInfo.bluebookImage = {
        public_id: bluebookImageResponse.public_id,
        url: bluebookImageResponse.secure_url,
      };
    }

    // insuranceImage

    if (req?.files?.insuranceImage) {
      const insuranceImageResponse = await cloudinary.uploader.upload(
        req.files.insuranceImage?.tempFilePath,
        { folder: "bluebook_images" },
        function (err: any, success: any) {
          if (err) {
            console.log(err);
          }
        }
      );
      updateInfo.insuranceImage = {
        public_id: insuranceImageResponse.public_id,
        url: insuranceImageResponse.secure_url,
      };
    }
    console.log(updateInfo);

    const response = await vehicleModel.findByIdAndUpdate(id, updateInfo);

    await response.save();

    return res.status(200).send({ message: "vehicle updated successfully!" });
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
};

module.exports = updateVehicle;
