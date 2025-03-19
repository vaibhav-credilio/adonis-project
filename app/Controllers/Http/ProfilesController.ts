import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'

export default class ProfilesController {
    public async createOrUpdate({ request, auth, response }: HttpContextContract) {
        const { email,name } = request.only(['email', 'mobileNo','name',])
        const user = auth.user!
    
        let profile = await Profile.findBy('userId', user.id)
    
        if (!profile) {
          profile = new Profile()
          profile.userId = user.id
        }
    
        profile.email = email
        profile.mobileNo = user.mobileNo
        profile.name = name

        await profile.save()
    
        return response.ok(profile)
      }
}
