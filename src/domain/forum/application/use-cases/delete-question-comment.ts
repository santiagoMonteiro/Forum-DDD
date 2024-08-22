import { Either, failure, success } from '@/core/either'
import { QuestionCommentRepository } from '../repositories/question-comment-repository'

type DeleteQuestionCommentUseCaseRequest = {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentUseCaseResponse = Either<string, {}>

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepository: QuestionCommentRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this.questionCommentRepository.findById(
      questionCommentId
    )

    if (!questionComment) {
      return failure('Question Comment not found.')
    }

    if (questionComment.authorId.toString() !== authorId) {
      return failure('Not allowed.')
    }

    await this.questionCommentRepository.delete(questionComment)

    return success({})
  }
}
