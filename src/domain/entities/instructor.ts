import { randomUUID } from 'crypto'

export class Instructor {
  public id
  public name

  constructor(name: string, id?: string) {
    this.name = name
    this.id = id ?? randomUUID()
  }
}