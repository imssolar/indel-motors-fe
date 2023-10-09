export interface User {
  name: string;
  last_name: string;
  email: string;
  enabled: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
