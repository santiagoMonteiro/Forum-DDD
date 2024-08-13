import { InMemoryAnswersRepository } from '_/test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { makeAnswer } from '_/test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  test('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('answer-1'))

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  test('should not be able to delete a answer from another user', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('answer-1'))

    await inMemoryAnswersRepository.create(newAnswer)

    expect(async () => {
      await sut.execute({
        answerId: 'answer-2',
        authorId: newAnswer.authorId.toString(),
      })
    }).rejects.toBeInstanceOf(Error)

  })
})
