export interface UserLogin {
  name: string;
  role: string;
}
export interface UserStateModel {
  userDetails: UserLogin[];
  userRole: UserLogin[]
}
