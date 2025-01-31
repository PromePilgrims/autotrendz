import {
  AllowedMimeTypes,
  MaxFileSizeValidator,
} from '@/modules/@shared/application/validation'

import { FileValidator } from '@nestjs/common'

const maxSizeInMb = Number(process.env.MAX_IMAGE_SIZE_IN_MB) || 3

export const makeImageValidators = (): FileValidator<Record<string, any>>[] => {
  return [
    new MaxFileSizeValidator({ maxSizeInMb }),
    new AllowedMimeTypes(['png', 'jpg', 'gif', 'webp']),
  ]
}
