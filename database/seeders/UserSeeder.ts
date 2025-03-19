import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
   await User.createMany([
      {
        mobileNo: '9975550492',
        name: 'legend killer',
        role: 'admin'
      },
      {
        mobileNo: '8308869173',
        name: 'vaibhav kamble',
        role: 'customer'
      }
    ])
  }
}

