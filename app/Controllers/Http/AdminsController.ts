import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AdminsController {
    public async getCustomerList({ response }: HttpContextContract) {
        const customers = await User.query().where('role', 'customer')
        return response.ok(customers)
      }
    
      public async getCustomerProfile({ params, response }: HttpContextContract) {
        const user = await User.find(params.id)
    
        if (!user) {
          return response.notFound({ message: 'User not found' })
        }
    
        await user.load('profile') 
    
        return response.ok(user)
      }
}
