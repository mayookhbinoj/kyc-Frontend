import { boolean } from "zod";

export interface InputFieldProps{
    id:string;
    label:string;
    name:any ;
    value:string |number,
    type: 'text' | 'number' | 'email' | 'password';
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder:string;
    hasError: boolean; 
    errorMessage?: string;
}
export interface ButtonProps {
    type: 'button' | 'submit' | 'reset';
    label: string;
    onClick?: () => void; 
}

export interface CheckboxProps{
    label:string
}
export interface ProtectedRouteProps {
  element: React.ReactElement;
}