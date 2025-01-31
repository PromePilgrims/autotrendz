import {
  IFileGetService,
  IFileUploadService,
  IGetUploadPresignedUrlService,
} from '@/modules/@shared/domain/contracts'

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GetObjectCommand, PutObjectCommand, S3 } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

@Injectable()
export class S3FileService
  implements IFileUploadService, IFileGetService, IGetUploadPresignedUrlService
{
  private readonly S3: S3

  constructor(private readonly configService: ConfigService) {
    this.S3 = new S3({
      endpoint: configService.get('S3_ENDPOINT'),
      region: configService.get('S3_REGION'),
      credentials: {
        accessKeyId: configService.get('S3_ACCESS_KEY'),
        secretAccessKey: configService.get('S3_SECRET_ACCESS_KEY'),
      },
    })
  }

  async getUploadPresignedUrl({
    key,
    content_type,
  }: IGetUploadPresignedUrlService.Input): Promise<IGetUploadPresignedUrlService.Output> {
    const command = new PutObjectCommand({
      Bucket: this.configService.get('BUCKET_NAME'),
      Key: key,
      ContentType: content_type,
    })
    const url = await getSignedUrl(this.S3, command, { expiresIn: 3600 })

    return url
  }

  async upload({
    fileName,
    buffer,
    expires,
  }: IFileUploadService.Input): Promise<IFileUploadService.Output> {
    await this.S3.send(
      new PutObjectCommand({
        Bucket: this.configService.get('BUCKET_NAME'),
        Key: fileName,
        Body: buffer,
        ACL: 'public-read',
        Expires: expires,
      }),
    )

    return `${this.configService.get('S3_ENDPOINT')}/${this.configService.get(
      'BUCKET_NAME',
    )}/${fileName}`
  }

  async get({ key }: IFileGetService.Input): Promise<IFileGetService.Output> {
    const command = new GetObjectCommand({
      Bucket: this.configService.get('BUCKET_NAME'),
      Key: key,
    })
    const url = await getSignedUrl(this.S3, command, { expiresIn: 3600 })

    return url
  }
}
