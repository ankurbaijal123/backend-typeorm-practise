export class CreateUserParams{
    username: string;
    password: string;
    authStrategy?: string;
}  

export class UpdateUserParams{
    username: string;
    password: string;
    authStrategy?: string;
}  

export class UserProfileParams {
    firstName: string;
    lastName: string
    age: number;
    dob: string
    
}

export type CreateUserPostParams = {
    title:string;
    description: string;
}