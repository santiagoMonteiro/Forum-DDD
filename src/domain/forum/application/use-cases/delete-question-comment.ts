import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentRepository } from '../repositories/question-comment-repository'

type DeleteQuestionCommentRequest = {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentResponse = {}

export class DeleteQuestionComment {
  constructor(private questionCommentRepository: QuestionCommentRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentRequest): Promise<DeleteQuestionCommentResponse> {
    const questionComment = await this.questionCommentRepository.findById(
      questionCommentId
    )

    if (!questionComment) {
      throw new Error('Question Comment not found.')
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }

    await this.questionCommentRepository.delete(questionComment)

    return {}
  }
}
