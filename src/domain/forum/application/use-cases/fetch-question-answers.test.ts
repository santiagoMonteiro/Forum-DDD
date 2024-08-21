import { InMemoryAnswerRepository } from '_/test/repositories/in-memory-answer-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { makeAnswer } from '_/test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswerRepository)
  })

  test('should be able to fetch question answers', async () => {
    await inMemoryAnswerRepository.create(makeAnswer(
      {
        questionId: new UniqueEntityID('question-1')
      }
    ))
    await inMemoryAnswerRepository.create(makeAnswer(
      {
        questionId: new UniqueEntityID('question-1')
      }
    ))
    await inMemoryAnswerRepository.create(makeAnswer(
      {
        questionId: new UniqueEntityID('question-1')
      }
    ))

    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 1
    })

    expect(answers).toHaveLength(3)
  })

  test('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerRepository.create(makeAnswer({
        questionId: new UniqueEntityID('question-1')
      }))
    }

    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(answers).toHaveLength(2)
  })
})
