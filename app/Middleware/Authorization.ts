import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

type Action = 'createCustomer' | 'viewCustomer' | 'updateCustomer' | 'deleteCustomer'

export default class Authorization {

  public async handle(
    { auth, response,bouncer }: HttpContextContract,
    next: () => Promise<void>,
    actions: Action[] 
  ) {
    const user = auth.user!

    for (let action of actions) {
      const isAuthorized = await bouncer.allows(action as never,user)

      if (!isAuthorized) {
        return response.forbidden({ message: `You do not have permission to perform the '${action}' action.` })
      }
    }

    await next()
  }
}
