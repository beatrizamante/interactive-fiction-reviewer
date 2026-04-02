import { CreateFictionDto } from './dto/create-fiction.dto.js';
import { UpdateFictionDto } from './dto/update-fiction.dto.js';
import * as jwtPayloadInterface from '../auth/jwt-payload.interface.js';
import { FictionsService } from './fictions.service.js';
export declare class FictionsController {
    private readonly fictionService;
    constructor(fictionService: FictionsService);
    create(dto: CreateFictionDto, user: jwtPayloadInterface.JwtPayload): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        genre: string | null;
        publishedAt: number | null;
        authorId: number;
    }>;
    findAll(page?: string, limit?: string): Promise<{
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
    update(id: number, dto: UpdateFictionDto, user: jwtPayloadInterface.JwtPayload): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        genre: string | null;
        publishedAt: number | null;
        authorId: number;
    }>;
    remove(id: number, user: jwtPayloadInterface.JwtPayload): Promise<{
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
