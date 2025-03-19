/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

// current implementation
Route.group(()=>{
  Route.post('/send-otp', 'AuthController.sendOtp')
  Route.post('/verify-otp', 'AuthController.verifyOTP')
}).prefix('/api/v1/auth')


Route.group(() => {
  Route.get('/customers', 'AdminsController.getCustomerList')
  Route.get('/customers/:id', 'AdminsController.getCustomerProfile')
})
  .middleware(['auth', 'role:admin']).prefix('/api/v2')


Route.group(()=>{
  Route.post('/', 'ProfilesController.createOrUpdate')
}).middleware(['auth']).prefix('/api/v1/profile')