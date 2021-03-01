export enum Role{
  Developer ='developer',
  Desinger =  'designer',
  Planner = 'planner'
}

export interface RoleIcon{
  [key: string]: string;
}

export interface Member{
  id: string;
  first_name: string;
  role: string;
  last_name: string;
  serve_years: number;
}

export interface Equipment{
  id: string;
}

export interface Software{
  id: string;
}

export interface Person{
  id: number;
  sex: string;
  first_name: string;
  last_name: string;
  blood_type: string;
}