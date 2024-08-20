import { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comment-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentRepository
  implements QuestionCommentRepository
{
  public items: QuestionComment[] = []

  async findById(questionCommentId: string) {
    const questionComment = this.items.find(
      (questionComment) => questionCommentId === questionComment.id.toString()
    )

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async delete(questionComment: QuestionComment) {
    const questionCommentIndex = this.items.findIndex(
      (item) => item.id === questionComment.id
    )

    this.items.splice(questionCommentIndex, 1)
  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }
}
