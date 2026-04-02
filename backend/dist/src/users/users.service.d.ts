import { PrismaService } from '../prisma/prisma.service.js';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findMe(userId: number): Promise<{
        name: string;
        email: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateMe(userId: number, data: {
        name?: string;
        email?: string;
    }): Promise<{
        name: string;
        email: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
