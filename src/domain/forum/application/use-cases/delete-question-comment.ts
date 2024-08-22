import { Either, failure, success } from '@/core/either'
import { QuestionCommentRepository } from '../repositories/question-comment-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

type DeleteQuestionCommentUseCaseRequest = {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

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
      return failure(new ResourceNotFoundError())
    }

    if (questionComment.authorId.toString() !== authorId) {
      return failure(new NotAllowedError())
    }

    await this.questionCommentRepository.delete(questionComment)

    return success({})
  }
}
