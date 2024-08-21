import { AnswerCommentRepository } from '../repositories/answer-comment-repository'

type DeleteAnswerCommentRequest = {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentResponse = {}

export class DeleteAnswerComment {
  constructor(private answerCommentRepository: AnswerCommentRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentRequest): Promise<DeleteAnswerCommentResponse> {
    const answerComment = await this.answerCommentRepository.findById(
      answerCommentId
    )

    if (!answerComment) {
      throw new Error('Answer Comment not found.')
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }

    await this.answerCommentRepository.delete(answerComment)

    return {}
  }
}
