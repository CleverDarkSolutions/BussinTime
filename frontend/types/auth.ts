export type LoginUser = {
  userName: string,
  password: string
}

export type User = {
  userId?: string,
  username: string,
  password: string,
  name?: string,
  age?: string,
  city?: string,
  country?: string,
  address?: string,
  description?: string,
  email?: string,
  gender?: string,
  image?: string,
  gps?: boolean,
  privateProfile?: boolean,
  shareUsageData?: boolean,
  directMessages?: 'everyone' | 'friends' | 'no one',
}

export type UserNewApi = {
  id: number,
  name: string,
  email: string,
  password: string,
  description: string,
  photoPath: string
  age: string | number,
  city: string,
  country: string,
  address: string,
  username: string,
  gender: string,
  premium: any,
}
