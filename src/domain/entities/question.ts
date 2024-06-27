import { Slug } from './value-objects/slug'
import { Entity } from '../../core/entities/entities'

type QuestionProps = {
  title: string
  content: string
  slug: Slug
  authorId: string
}

export class Question extends Entity<QuestionProps> {}
