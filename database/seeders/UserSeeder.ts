import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
 


    User.createMany([
      {
        mobileNo: '1234567890',
        name: 'John Doe',
        role: 'admin'
      },
      {
        mobileNo: '0987654321',
        name: 'Jane Doe',
        role: 'customer'
      }
    ])
  }
}
