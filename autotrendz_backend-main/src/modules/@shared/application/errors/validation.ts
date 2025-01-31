export class InvalidMimeTypeError extends Error {
  readonly status = 422

  constructor(allowed: string[]) {
    super(`Unsupported file. Allowed extensions: ${allowed.join(', ')}`)
    this.name = 'InvalidMimeTypeError'
  }
}

export class MaxFileSizeError extends Error {
  readonly status = 422

  constructor(maxSizeInMb: number) {
    super(`File upload limit is ${maxSizeInMb}MB`)
    this.name = 'MaxFileSizeError'
  }
}
