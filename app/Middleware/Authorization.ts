import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


type Action = 'viewCustomer' | 'updateCustomer' | 'deleteCustomer'

export default class Authorization {
  public async handle(
    { auth, response, bouncer }: HttpContextContract,
    next: () => Promise<void>,
    actions: Action[], 
  ) {
    const user = auth.user!
    
    const authorizer = bouncer.forUser(user)

    for (let action of actions) {
      const isAuthorized = await authorizer.allows(action,user)
      if (!isAuthorized) {
        return response.forbidden({
          message: `You do not have permission to perform the '${action}' action on this resource.`
        })
      }
    }
    
    await next() 

  }
}
