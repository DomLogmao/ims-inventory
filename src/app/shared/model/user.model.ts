import { BaseModel } from "./base.model"
import { Address } from "./address.model"

export class User  {
    userId: number
    email: string
    firstname: string
    lastname: string
    mobileNo: number
    telephoneNo: number
    username: string
    accountNonExpired: boolean
    credentialsNonExpired: boolean
    accountNonLocked: boolean
    role: string
    imgSrc: string
    lastLogin: string
    addresses: Address[]
    roles: string[]
}
