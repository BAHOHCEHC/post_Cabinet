export interface User {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn:string;
}
export interface FbCreateResponse {
  name: string;
}

export interface Post {
  id?: String;
  title: String;
  text: String;
  author: String;
  date: Date;
}
