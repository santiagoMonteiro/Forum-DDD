import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repositories/answer-repository'

type FetchQuestionAnswersUseCaseRequest = {
  questionId: string
  page: number
}

type FetchQuestionAnswersUseCaseResponse = {
  answers: Answer[]
}

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswerRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(questionId, { page })

    return {
      answers,
    }
  }
}
