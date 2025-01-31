import { ClientId } from '@/modules/client/domain'
import { ClientRole } from '@/modules/client/domain/entity'
import {
  NameValueObject,
  EmailValueObject,
  PasswordValueObject,
} from '@/modules/@shared/domain/value-object'
import { ImageValueObject } from '@/modules/@shared/domain/value-object'

type ClientProps = {
  id: ClientId
  name: string
  email: string
  password: string
  image?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  lastLoginAt?: Date
}

export class Client {
  private _active = false
  private _createdBy: string
  private _role: ClientRole = ClientRole.CLIENT

  private constructor(
    private readonly _id: ClientId,
    private _name: NameValueObject,
    private _email: EmailValueObject,
    private _password: PasswordValueObject,
    private _image: ImageValueObject,
    private _createdAt: Date,
    private _updatedAt: Date,
    private _deletedAt: Date,
    private _lastLoginAt: Date,
  ) {}

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get email() {
    return this._email
  }

  get password() {
    return this._password
  }

  get image() {
    return this._image
  }

  get createdAt() {
    return this._createdAt
  }

  get createdBy() {
    return this._createdBy
  }

  get updatedAt() {
    return this._updatedAt
  }

  get deletedAt() {
    return this._deletedAt
  }

  get isDeleted() {
    return !!this._deletedAt
  }

  get lastLoginAt() {
    return this._lastLoginAt
  }

  get isActive() {
    return this._active
  }

  get role() {
    return this._role
  }

  get isAdmin() {
    return this.role === ClientRole.ADMIN
  }

  setRole(role: ClientRole) {
    this._role = role
  }

  changeName(name: NameValueObject) {
    this._name = name
  }

  changeImage(image: ImageValueObject) {
    this._image = image
  }

  changePassword(password: PasswordValueObject) {
    this._password = password
  }

  setCreatedBy(created_by: string) {
    this._createdBy = created_by
  }

  justLoggedIn() {
    this._lastLoginAt = new Date()
  }

  activate() {
    this._active = true
  }

  deactivate() {
    this._active = false
  }

  delete() {
    this._deletedAt = new Date()
  }

  static create({
    id,
    name,
    email,
    password,
    image,
    createdAt,
    updatedAt,
    deletedAt,
    lastLoginAt,
  }: ClientProps): Client {
    const now = new Date()

    const client = new Client(
      id,
      NameValueObject.create(name),
      EmailValueObject.create(email),
      PasswordValueObject.create(password),
      ImageValueObject.create(image),
      createdAt ?? now,
      updatedAt ?? now,
      deletedAt ?? null,
      lastLoginAt ?? null,
    )

    const clientProxy = new Proxy(client, {
      set: (target, prop, value) => {
        target[prop] = value
        target['_updatedAt'] = new Date()
        return true
      },
    })

    return clientProxy
  }
}
