import { PrismaService } from '../prisma/prisma.service.js';
import { CreateFictionDto } from './dto/create-fiction.dto.js';
import { UpdateFictionDto } from './dto/update-fiction.dto.js';
export declare class FictionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateFictionDto, authorId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        genre: string | null;
        publishedAt: number | null;
        authorId: number;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        data: ({
            author: {
                name: string;
                id: number;
            };
            authors: {
                name: string;
                id: number;
                createdAt: Date;
                role: string;
                fictionId: number;
            }[];
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
            genre: string | null;
            publishedAt: number | null;
            authorId: number;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number): Promise<{
        author: {
            name: string;
            id: number;
        };
        reviews: ({
            author: {
                name: string;
                id: number;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            authorId: number;
            fictionId: number;
            rating: number;
            comment: string | null;
            narrative: number;
            interactivity: number;
            originality: number;
        })[];
        authors: {
            name: string;
            id: number;
            createdAt: Date;
            role: string;
            fictionId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        genre: string | null;
        publishedAt: number | null;
        authorId: number;
    }>;
    update(id: number, dto: UpdateFictionDto, userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        genre: string | null;
        publishedAt: number | null;
        authorId: number;
    }>;
    remove(id: number, userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        genre: string | null;
        publishedAt: number | null;
        authorId: number;
    }>;
}
