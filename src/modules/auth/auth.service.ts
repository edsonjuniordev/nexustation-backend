import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { UserRepository } from '../database/repositories/user.repository';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userRepository: UserRepository, private readonly jwtService: JwtService) { }

    async signin(singinDto: SigninDto) {
        const { email, password } = singinDto

        const user = await this.userRepository.findUnique({
            where: { email }
        })

        if (!user) {
            throw new UnauthorizedException('invalid credentials')
        }

        const isPasswordValid = await compare(password, user.password)

        if (!isPasswordValid) {
            throw new UnauthorizedException('invalid credentials')
        }

        const accessToken = await this.generateAccessToken(user.id)

        return {
            access_token: accessToken
        }
    }

    async signup(signupDto: SignupDto) {
        const { email, password, name } = signupDto
        const emailCreated = await this.userRepository.findUnique({
            where: { email }
        })

        if (emailCreated) {
            throw new ConflictException('email already in use')
        }

        const hashedPassword = await hash(password, 12)
        const now = new Date().toISOString()

        const userCreated = await this.userRepository.create({
            data: {
                email,
                name,
                password: hashedPassword,
                createdAt: now,
                updatedAt: now,
            }
        })

        const accessToken = await this.generateAccessToken(userCreated.id)

        return {
            access_token: accessToken
        }
    }

    generateAccessToken(userId: string): Promise<String> {
        return this.jwtService.signAsync({ userId })
    }
}
