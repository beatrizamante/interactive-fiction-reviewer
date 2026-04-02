import { UpdateUserDto } from './dto/update-users.dto.js';
import * as jwtPayloadInterface from '../auth/jwt-payload.interface.js';
import { UsersService } from './users.service.js';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getMe(user: jwtPayloadInterface.JwtPayload): Promise<{
        name: string;
        email: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateMe(user: jwtPayloadInterface.JwtPayload, dto: UpdateUserDto): Promise<{
        name: string;
        email: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
