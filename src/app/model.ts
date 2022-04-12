
export interface Product {
  id: number;
  title: string;
  img: string;
  text:  string;
}

export interface Review {
  "id"?: number
  "product": number
  "created_by"?:
    {
      "id": number
      "username": string
    },
  "rate": number
  "text": string
}

export interface User {
  username: string;
  password: string
}

export interface LoginResponse {
      success: boolean,
      token?: string,
      messages?: string,
}
