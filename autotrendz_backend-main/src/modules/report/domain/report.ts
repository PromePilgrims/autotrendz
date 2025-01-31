import { ReportId } from '@/modules/report/domain/entity'
import { ClientId } from '@/modules/client/domain'

export type ReportProps = {
  id?: ReportId
  clients: ReportClientProps[]
  name: string
  workspaceId: string
  reportId: string
  createdBy: string
  createdAt?: Date
  updatedAt?: Date
}

export type ReportClientProps = {
  id: ClientId
  name?: string
}

export class Report {
  private constructor(
    private readonly _id: ReportId,
    private _clients: ReportClientProps[],
    private _name: string,
    private _workspaceId: string,
    private _reportId: string,
    private _createdBy: string,
    private _createdAt: Date,
    private _updatedAt: Date,
  ) {}

  get id(): ReportId {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get clients(): ReportClientProps[] {
    return this._clients
  }

  get workspaceId(): string {
    return this._workspaceId
  }

  get reportId(): string {
    return this._reportId
  }

  get createdBy(): string {
    return this._createdBy
  }

  get createdAt(): Date {
    return this._createdAt
  }

  get updatedAt(): Date {
    return this._updatedAt
  }

  changeName(name: string) {
    this._name = name
  }

  changeClients(clients: ReportClientProps[]) {
    this._clients = clients
  }

  changeWorkspace(workspaceId: string) {
    this._workspaceId = workspaceId
  }

  changeReport(reportId: string) {
    this._reportId = reportId
  }

  static create({
    id,
    name,
    clients,
    workspaceId,
    reportId,
    createdBy,
    createdAt,
    updatedAt,
  }: ReportProps): Report {
    const now = new Date()

    const report = new Report(
      id ? id : ReportId.create(),
      clients,
      name,
      workspaceId,
      reportId,
      createdBy,
      createdAt ?? now,
      updatedAt ?? now,
    )

    return new Proxy(report, {
      set: (target, prop, value) => {
        target[prop] = value
        target['_updatedAt'] = new Date()
        return true
      },
    })
  }
}
