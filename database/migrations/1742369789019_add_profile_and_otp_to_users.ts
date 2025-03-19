import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {

  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('profile').nullable().unsigned().references('id').inTable('profiles').onDelete('SET NULL')
      table.integer('otp').nullable().unsigned().references('id').inTable('otps').onDelete('SET NULL')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('profile')
      table.dropColumn('otp')
    })
  }
}
