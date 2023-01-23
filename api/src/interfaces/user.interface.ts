import { Auth } from "./auth.interface";

export interface User extends Auth {
  name: string;
  lastname: string;
  role: string;
}