import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignupDto {
    constructor(signupDto?: Partial<SignupDto> ){
        this.email = signupDto?.email
        this.name = signupDto?.name
        this.password = signupDto?.password
    }

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}
