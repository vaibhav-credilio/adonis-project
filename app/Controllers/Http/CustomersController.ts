// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContext } from "@adonisjs/core/build/standalone"
import Customer from "App/Models/Customer"
import crypto from 'crypto'
export default class CustomersController {

  // OTP generation function
  private generateOTP(): string {
    return crypto.randomInt(100000, 999999).toString().padStart(6, '0')
  }

  public async register({ request, response }: HttpContext) {
    const { mobile_no, name, role } = request.only(['name', 'mobile_no', 'role'])

    const isExist = await Customer.query().where('mobile_no', mobile_no).first()

    if (isExist) {
      return response.status(400).json({
        success: false,
        message: "Customer already registered"
      })
    }

    const customer = await Customer.create({
      mobile_no,
      name,
      role
    })

    return response.created(customer)
  }

  public async signin({ request, response }: HttpContext) {
    const { mobile_no } = request.only(['mobile_no'])

    const isExist = await Customer.query().where('mobile_no', mobile_no).first()
    const otp = this.generateOTP()

    if (!isExist) {
      // register user


      const customer = await Customer.create({
        mobile_no,
        otp
      })

    }

    isExist ? isExist.otp = otp : null

    await isExist?.save()

    return response.status(200).json({
      success: true,
      message: "Otp sent to you mobile number"
    })
  }

  public async login({ request, response, auth }) {

    const { mobile_no, otp } = request.only(['mobile_no', 'otp'])

    const customer = await Customer.query().where('mobile_no', mobile_no).andWhere('otp', otp).first()

    if (!customer) {
      return response.status(400).json({
        success: false,
        message: "Invalid otp or number"
      })
    }
    const token = await auth.use('api').generate(customer)

    return response.status(200).json({
      success: true,
      message: "Logged in successfully",
      token
    })

  }

  public async updateProfile({ request, response, auth }) {
    const { id } = request.params()
    await auth.use('api').authenticate()
    console.log(auth.use('api').user!)



    const profile = await Customer.find(id)

    if (!profile) {
      return response.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    profile.name = request.input('name')
    await profile.save()

    return response.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      profile,
    })
  }


  public async logout({ auth, response }) {
    await auth.use('api').revoke()
    
    return response.status(200).json({
      success: true,
      message: "Access revoked"
    })
  }

  public async getAllCustomers({ response, auth, bouncer }) {
    console.log("hello");
    
    const user = await auth.use('api').authenticate()


    await bouncer.authorize('viewCustomer', user)


    const customers = await Customer.all()

    return response.status(200).json({
      success: true,
      data: customers,
    })
  }


}
