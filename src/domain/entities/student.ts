import { randomUUID } from 'crypto'

export class Student {
  public id
  public name

  constructor(name: string, id?: string) {
    this.name = name
    this.id = id ?? randomUUID()
  }
}