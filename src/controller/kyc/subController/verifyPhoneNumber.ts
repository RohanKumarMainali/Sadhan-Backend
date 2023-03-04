import { Request, Response, NextFunction } from "express"

const userModel = require('../../../models/user.model')

const verifyPhoneNumber = async (req: Request, res: Response, next: NextFunction) => {

    const id = req.body.id
    console.log(id)
    const kyc = { phoneNumber: 'verified' };
    try {

        const response = await userModel.findByIdAndUpdate(id, {
            kyc: kyc
        })
        console.log(response)
        return res.status(200).send({ message: 'phone number verified successfully! ' })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = verifyPhoneNumber
