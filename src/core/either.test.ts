import { Either, failure, success } from './either'

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return success(10)
  } else {
    return failure('failure')
  }
}

test('success result', () => {
  const successResult = doSomething(true)

  if (successResult.isSuccess()) {
    console.log(successResult.value)
  }

  expect(successResult.isSuccess()).toBe(true)
  expect(successResult.isFailure()).toBe(false)

})

test('failure result', () => {
  const failureResult = failure('failure')

  expect(failureResult.isFailure()).toBe(true)
  expect(failureResult.isSuccess()).toBe(false)
})