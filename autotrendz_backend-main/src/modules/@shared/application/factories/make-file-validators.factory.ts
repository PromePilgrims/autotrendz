import { MaxFileSizeValidator } from '@/modules/@shared/application/validation'

import { FileValidator } from '@nestjs/common'

const maxSizeInMb = Number(process.env.MAX_FILE_SIZE_IN_MB) || 50

export const makeFileValidators = (): FileValidator<Record<string, any>>[] => {
  return [new MaxFileSizeValidator({ maxSizeInMb })]
}
