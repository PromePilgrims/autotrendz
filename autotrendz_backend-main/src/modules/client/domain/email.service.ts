export type NotifyCredentialsProps = {
  email: string
  password: string
}

export type NotifyRecoveryHashProps = {
  email: string
  hash: string
}

export interface IEmailService {
  notifyCredentials(props: NotifyCredentialsProps): Promise<void>
  notifyRecoveryHash(props: NotifyRecoveryHashProps): Promise<void>
}
