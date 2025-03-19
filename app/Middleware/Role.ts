import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Role {

  public async handle ({ auth, response }: HttpContextContract, next: () => Promise<void>, roles: string[]) {
    const user = auth.user!

    if (!roles.includes(user.role)) {
      return response.forbidden({ message: 'You do not have permission to perform this action.' })
    }

    await next()
  }
}
