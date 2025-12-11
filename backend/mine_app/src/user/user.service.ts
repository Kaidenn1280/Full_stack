import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  async register(createUserDto: CreateUserDto): Promise<{ message: string; user: Partial<User> }> {
    const { name, email, password } = createUserDto;

    // Check if user already exists
    const existingUser = await this.userRepo.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save user
    const user = this.userRepo.create({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await this.userRepo.save(user);

    // Return user without password
    return {
      message: 'User registered successfully',
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
        createdAt: savedUser.createdAt,
      },
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<{ message: string; user: Partial<User> }> {
    const { email, password } = loginUserDto;

    // Find user by email
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Return user without password
    return {
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    };
  }

  async findAll(): Promise<Partial<User>[]> {
    const users = await this.userRepo.find();
    // Return users without passwords
    return users.map(({ password, ...user }) => user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }
}
