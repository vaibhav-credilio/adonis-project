import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'
import Otp from './Otp'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public mobileNo:string

  @column()
  public name:string

  @column()
  public role:string

  @hasOne(() => Profile)
  public profile: HasOne<typeof Profile>

  @hasOne(()=>Otp)
  public otp:HasOne<typeof Otp>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}