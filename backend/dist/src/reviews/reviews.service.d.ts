import { PrismaService } from '../prisma/prisma.service.js';
import { CreateReviewDto } from './dto/create-reviews.dto.js';
import { UpdateReviewDto } from './dto/update-reviews.dto.js';
export declare class ReviewsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(fictionId: number, dto: CreateReviewDto, authorId: number): Promise<{
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
    }>;
    findAll(fictionId: number, page?: number, limit?: number): Promise<{
        data: ({
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
        total: number;
        page: number;
        limit: number;
    }>;
    update(fictionId: number, id: number, dto: UpdateReviewDto, userId: number): Promise<{
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
    }>;
    remove(fictionId: number, id: number, userId: number): Promise<{
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
    }>;
}
