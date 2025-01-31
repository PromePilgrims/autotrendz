import { InvalidMimeTypeError } from '@/modules/@shared/application/errors'

import { FileValidator } from '@nestjs/common'

export type Extension = 'png' | 'jpg' | 'gif' | 'webp' | 'xlsx' | 'csv'

export class AllowedMimeTypes extends FileValidator {
  constructor(private readonly allowed: Extension[]) {
    super({})
  }

  isValid(file: any): boolean {
    let isValid = false

    if (this.allowed.includes('jpg') && /image\/jpe?g/.test(file.mimetype))
      isValid = true
    else if (this.allowed.includes('png') && file.mimetype === 'image/png')
      isValid = true
    else if (this.allowed.includes('gif') && file.mimetype === 'image/gif')
      isValid = true
    else if (this.allowed.includes('webp') && file.mimetype === 'image/webp')
      isValid = true
    else if (
      this.allowed.includes('xlsx') &&
      file.mimetype ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
      isValid = true
    else if (this.allowed.includes('csv') && file.mimetype === 'text/csv')
      isValid = true

    return isValid
  }

  buildErrorMessage(): string {
    throw new InvalidMimeTypeError(this.allowed)
  }
}
