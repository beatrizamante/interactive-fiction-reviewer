import * as jwtPayloadInterface from '../auth/jwt-payload.interface.js';
import { CreateAuthorDto } from './dto/create-author.dto.js';
import { AuthorsService } from './authors.service.js';
export declare class AuthorsController {
    private readonly authorsService;
    constructor(authorsService: AuthorsService);
    create(fictionId: number, dto: CreateAuthorDto, user: jwtPayloadInterface.JwtPayload): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        role: string;
        fictionId: number;
    }>;
    findAll(fictionId: number): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        role: string;
        fictionId: number;
    }[]>;
    remove(fictionId: number, id: number, user: jwtPayloadInterface.JwtPayload): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        role: string;
        fictionId: number;
    }>;
}
