import { Either, failure, success } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

type EditQuestionUseCaseRequest = {
  authorId: string
  questionId: string
  title: string
  content: string
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return failure(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return failure(new NotAllowedError())
    }

    question.title = title
    question.content = content

    await this.questionRepository.save(question)

    return success({
      question,
    })
  }
}
