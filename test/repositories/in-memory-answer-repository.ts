import { AnswerRepository } from '@/domain/forum/application/repositories/answer-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = []

  async findById(answerId: string) {
    const answer = this.items.find(
      (answer) => answerId === answer.id.toString()
    )

    if (!answer) {
      return null
    }

    return answer
  }

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async save(answer: Answer) {
    const answerIndex = this.items.findIndex(
      (item) => item.id === answer.id
    )

    this.items[answerIndex] = answer
  }

  async delete(answer: Answer) {
    const answerIndex = this.items.findIndex(item => item.id === answer.id)
    
    this.items.splice(answerIndex, 1)
  }
}
