export type User = {
  id?: number
  name: string
  email: string
  passwordHash: string
  abilitys?: string | null
  photo: string | null
  emailVerify: number
  permission: string | null
}

export type Post = {
  id?: number,
  message?: string,
  imagePost?: string,
  author: string,
  authorId?: number,
  createAt?: FormData
}

export type News = {
  id?: number,
  title: string,
  createAt?: FormData
}