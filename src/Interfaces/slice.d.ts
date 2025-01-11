import {getUserData, LoginFormData} from "./forms"
export interface userState{
  user:LoginFormData|null
  users:getUserData[]
  isError:boolean,
  isLoading:boolean,
  isSucess:boolean,
  isChange:Boolean,
  isEmail:Boolean,
  message:string

}