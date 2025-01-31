export interface IGetUploadPresignedUrlService {
  getUploadPresignedUrl(
    input: IGetUploadPresignedUrlService.Input,
  ): Promise<IGetUploadPresignedUrlService.Output>
}

export interface IFileUploadService {
  upload(input: IFileUploadService.Input): Promise<IFileUploadService.Output>
}

export interface IFileGetService {
  get(input: IFileGetService.Input): Promise<IFileGetService.Output>
}

export namespace IGetUploadPresignedUrlService {
  export type Input = { key: string; content_type: string }
  export type Output = string
}

export namespace IFileUploadService {
  export type Input = { fileName: string; buffer: Buffer; expires?: Date }
  export type Output = string
}

export namespace IFileGetService {
  export type Input = { bucket: string; key: string }
  export type Output = string
}
