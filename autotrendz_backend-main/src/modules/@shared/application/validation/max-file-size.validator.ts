import { MaxFileSizeError } from '@/modules/@shared/application/errors'

import { FileValidator } from '@nestjs/common'

type MaxFileSizeValidatorProps = {
  maxSizeInMb: number
}

export class MaxFileSizeValidator extends FileValidator<MaxFileSizeValidatorProps> {
  isValid(file: any): boolean {
    return file.size <= this.validationOptions.maxSizeInMb * 1024 * 1024
  }

  buildErrorMessage(): string {
    throw new MaxFileSizeError(this.validationOptions.maxSizeInMb)
  }
}
