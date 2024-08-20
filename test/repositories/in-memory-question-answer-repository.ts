import { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comment-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentRepository implements AnswerCommentRepository {
  public items: AnswerComment[] = []

  async findById(answerCommentId: string) {
    const answerComment = this.items.find(
      (answerComment) => answerCommentId === answerComment.id.toString()
    )

    if (!answerComment) {
      return null
    }

    return answerComment
  }

  async delete(answerComment: AnswerComment) {
    const answerCommentIndex = this.items.findIndex(
      (item) => item.id === answerComment.id
    )

    this.items.splice(answerCommentIndex, 1)
  }

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }
}
