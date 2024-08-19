import { PaginationParams } from '@/core/repositories/pagination-params'
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

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.items.filter(
      (item) => item.questionId.toString() === questionId
    ).slice((page - 1) * 20, page * 20)

    return answers
  }

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async save(answer: Answer) {
    const answerIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items[answerIndex] = answer
  }

  async delete(answer: Answer) {
    const answerIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(answerIndex, 1)
  }
}
