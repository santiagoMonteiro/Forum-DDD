import { EditQuestionUseCase } from './edit-question'
import { makeQuestion } from '_/test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionRepository } from '_/test/repositories/in-memory-question-repository'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionRepository)
  })

  test('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1')
    )

    await inMemoryQuestionRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'author-1',
      questionId: 'question-1',
      title: 'title-test',
      content: 'content-test',
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: 'title-test',
      content: 'content-test',
    })
  })

  test('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1')
    )

    await inMemoryQuestionRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'author-2',
      questionId: 'question-1',
      title: 'title-test',
      content: 'content-test',
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
