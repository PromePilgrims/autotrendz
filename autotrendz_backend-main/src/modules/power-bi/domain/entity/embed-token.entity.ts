export class EmbedToken {
  constructor(
    readonly token: string,
    readonly reportName: string,
    readonly embedUrl: string,
    readonly expiration: Date,
  ) {}
}
