import jwtDecode from 'jwt-decode'
import { message } from 'antd'
export const isValidToken = (token: string) => {
  try {
    const decoded: any = jwtDecode(token)
    const currentTime = Math.floor(Date.now() / 1000)
    return decoded.exp > currentTime
  } catch (error) {
    return false
  }
}
export const handleCopy = (value: string, label: string) => {
  if (value) {
    navigator.clipboard.writeText(value)
    message.success(`${label} copied successfully`)
  }
}
