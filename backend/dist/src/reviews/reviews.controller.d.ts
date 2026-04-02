import * as jwtPayloadInterface from '../auth/jwt-payload.interface.js';
import { CreateReviewDto } from './dto/create-reviews.dto.js';
import { UpdateReviewDto } from './dto/update-reviews.dto.js';
import { ReviewsService } from './reviews.service.js';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(fictionId: number, dto: CreateReviewDto, user: jwtPayloadInterface.JwtPayload): Promise<{
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
    findAll(fictionId: number, page?: string, limit?: string): Promise<{
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
    update(fictionId: number, id: number, dto: UpdateReviewDto, user: jwtPayloadInterface.JwtPayload): Promise<{
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
    remove(fictionId: number, id: number, user: jwtPayloadInterface.JwtPayload): Promise<{
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
