import { PrismaService } from '../prisma/prisma.service.js';
import { CreateAuthorDto } from './dto/create-author.dto.js';
export declare class AuthorsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(fictionId: number, dto: CreateAuthorDto, userId: number): Promise<{
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
    remove(fictionId: number, id: number, userId: number): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        role: string;
        fictionId: number;
    }>;
}
