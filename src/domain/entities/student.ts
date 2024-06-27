import { Entity } from '../../core/entities/entities'

type StudentProps = {
  name: string
}
export class Student extends Entity<StudentProps> {}
