import { get } from './base'

const getUser = async () => await get<{ id: string; name: string }[]>('/users')

export { getUser }
