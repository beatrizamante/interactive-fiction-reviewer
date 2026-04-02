var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
export class UpdateReviewDto {
    rating;
    comment;
    narrative;
    interactivity;
    originality;
}
__decorate([
    IsInt(),
    Min(1),
    Max(5),
    IsOptional(),
    __metadata("design:type", Number)
], UpdateReviewDto.prototype, "rating", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], UpdateReviewDto.prototype, "comment", void 0);
__decorate([
    IsInt(),
    Min(1),
    Max(5),
    IsOptional(),
    __metadata("design:type", Number)
], UpdateReviewDto.prototype, "narrative", void 0);
__decorate([
    IsInt(),
    Min(1),
    Max(5),
    IsOptional(),
    __metadata("design:type", Number)
], UpdateReviewDto.prototype, "interactivity", void 0);
__decorate([
    IsInt(),
    Min(1),
    Max(5),
    IsOptional(),
    __metadata("design:type", Number)
], UpdateReviewDto.prototype, "originality", void 0);
//# sourceMappingURL=update-reviews.dto.js.map