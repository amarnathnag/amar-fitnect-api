import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async register(dto: RegisterDto): Promise<{ token: string }> {
        const exists = await this.userRepo.findOne({ where: { email: dto.email } });
        if (exists) throw new UnauthorizedException('Email already in use.');

        const hashed = await bcrypt.hash(dto.password, 10);
        const user = this.userRepo.create({ email: dto.email, password: hashed });
        await this.userRepo.save(user);

        const token = await this.jwtService.signAsync({ sub: user.id });
        return { token };
    }

    async login(dto: LoginDto): Promise<{ token: string }> {
        const user = await this.userRepo.findOne({ where: { email: dto.email } });
        if (!user || !(await bcrypt.compare(dto.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials.');
        }

        const token = await this.jwtService.signAsync({ sub: user.id });
        return { token };
    }

    async validateUser(userId: number): Promise<User | null> {
        return this.userRepo.findOne({ where: { id: userId } });
    }
}
