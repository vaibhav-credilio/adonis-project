import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Otp from 'App/Models/Otp'
import User from 'App/Models/User'
import { randomInt } from 'crypto'
import { DateTime } from 'luxon'
export default class AuthController {

    public async sendOtp({ request, response }: HttpContextContract) {
      
        const { mobileNo } = request.only(['mobileNo'])

        let user = await User.findBy('mobileNo', mobileNo)

        if (!user) {
            user = await User.create({ mobileNo, role: 'customer' })
        }

        const otp = randomInt(100000, 999999).toString()

        await Otp.create({
            otp: Number(otp),
            userId: user.id,
            mobileNo
        })
        return response.ok({ message: 'OTP sent successfully' })
    }

    public async verifyOTP({ request, response,auth }: HttpContextContract) {
        const {mobileNo,otp} = request.only(['mobileNo','otp'])
    
        const user = await User.findBy('mobileNo', mobileNo)
    
        if (!user) {
          return response.badRequest({ message: 'User not found' })
        }
    
        const otpRecord = await Otp.query()
          .where('userId', user.id)
          .where('otp', otp)
          .where('created_at', '>=', DateTime.local().minus({ minutes: 5 }).toSQL())
          .first()
    
        if (!otpRecord) {
          return response.badRequest({ message: 'Invalid or expired OTP' })
        }

        const token = await auth.use('api').generate(user)
    
        return response.ok({ message: 'OTP verified successfully',token })
      }
}
