export type IUser = {
  name: string
  status: UserStatus
}

export enum UserStatus {
  ADMIN = 'admin',
  USER = 'user'
}