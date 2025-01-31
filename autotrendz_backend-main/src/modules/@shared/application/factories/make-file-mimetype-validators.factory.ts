import {
  AllowedMimeTypes,
  Extension,
} from '@/modules/@shared/application/validation'

import { FileValidator } from '@nestjs/common'

export const makeFileMimetypeValidators = (
  mimetypes: Extension[],
): FileValidator<Record<string, any>>[] => {
  return [new AllowedMimeTypes(mimetypes)]
}
