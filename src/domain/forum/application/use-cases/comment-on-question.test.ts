import { InMemoryQuestionRepository } from '_/test/repositories/in-memory-question-repository'
import { makeQuestion } from '_/test/factories/make-question'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { InMemoryQuestionCommentRepository } from '_/test/repositories/in-memory-question-comment-repository'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentRepository
    )
  })

  test('should be able to comment on a question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionRepository.create(question)

    const result = await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'test comment',
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryQuestionCommentRepository.items[0].content).toEqual(
      'test comment'
    )
  })
})
