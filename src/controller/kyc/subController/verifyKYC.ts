const userModel = require("../../../models/user.model");
import { NextFunction, Request, Response } from "express";
const cloudinary = require("../../../utils/cloudinary");
interface imageType {
    public_id: string;
    url: string;
}
const postKYC = async (req: any, res: Response, next: NextFunction) => {
    const {
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        province,
        district,
        municipality,
        wardNumber,
        citizenshipNumber,
        citizenshipIssuedBy,
        citizenshipIssuedDate,
        drivingLicenseNumber,
        drivingLicenseIssuedBy,
        drivingLicenseIssuedDate,
        drivingLicenseExpireDate,

    } = req.body;

    const { id } = req.body
    const kycForm = req.body

    try {
        // image -- process

        const citizenshipImageFront = req.files.citizenshipImageFront;
        const citizenshipImageBack = req.files.citizenshipImageBack;
        const drivingLicenseImage = req.files.drivingLicenseImage;
        const citizenshipImageFrontResponse = await cloudinary.uploader.upload(
            citizenshipImageFront.tempFilePath,
            { folder: "citizenship_images" },
            function(err: any, success: any) {
                if (err) {
                    console.log(err);
                }
            }
        );

        const citizenshipImageBackResponse = await cloudinary.uploader.upload(
            citizenshipImageBack.tempFilePath,
            { folder: "citizenship_images" },
            function(err: any, success: any) {
                if (err) {
                    console.log(err);
                }
            }
        );


        const drivingLicenseImageResponse = await cloudinary.uploader.upload(
            drivingLicenseImage.tempFilePath,
            { folder: "driving_license_images" },
            function(err: any, success: any) {
                if (err) {
                    console.log(err);
                }
            }
        );

        // update kyc details in user model  

        const response = await userModel.findByIdAndUpdate(id, {
            kyc: {
                kycFormData: kycForm,
                citizenshipImageFront: {
                    public_id: citizenshipImageFrontResponse.public_id,
                    url: citizenshipImageFrontResponse.secure_url,
                },
                citizenshipImageBack: {
                    public_id: citizenshipImageBackResponse.public_id,
                    url: citizenshipImageBackResponse.secure_url,
                },

                drivingLicenseImage: {
                    public_id: drivingLicenseImageResponse.public_id,
                    url: drivingLicenseImageResponse.secure_url,
                },

            },
        });

        await response.save();
        return res
            .status(201)
            .send({ success: true, message: "KYC form posted successfully!", response });
    } catch (error) {
        next(error);
    }
};

module.exports = postKYC 
