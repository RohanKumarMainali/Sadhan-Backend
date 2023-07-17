import { Request, Response, NextFunction } from "express"

const userModel = require('../../../models/user.model')

const verifyPhoneNumber = async (req: Request, res: Response, next: NextFunction) => {

    const id = req.body.id
    try {

        const response = await userModel.findByIdAndUpdate(id, {
            phoneNumberVerified: 'verified'
        })
        return res.status(200).send({ message: 'phone number verified successfully! ' , data: response})

    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = verifyPhoneNumber
