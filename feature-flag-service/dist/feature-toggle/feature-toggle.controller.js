"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureToggleController = void 0;
const common_1 = require("@nestjs/common");
const feature_toggle_service_1 = require("./feature-toggle.service");
const get_feature_toggle_dto_1 = require("./dto/get-feature-toggle.dto");
const swagger_1 = require("@nestjs/swagger");
let FeatureToggleController = class FeatureToggleController {
    constructor(featureToggleService) {
        this.featureToggleService = featureToggleService;
    }
    getFeatureToggle(flagKey, getFeatureToggleDto) {
        return this.featureToggleService.getFlagValue(flagKey, getFeatureToggleDto);
    }
};
exports.FeatureToggleController = FeatureToggleController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: "Get a feature toggle value" }),
    (0, common_1.Get)(':flagKey'),
    __param(0, (0, common_1.Param)('flagKey')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, get_feature_toggle_dto_1.GetFeatureToggleDto]),
    __metadata("design:returntype", Promise)
], FeatureToggleController.prototype, "getFeatureToggle", null);
exports.FeatureToggleController = FeatureToggleController = __decorate([
    (0, common_1.Controller)('feature-toggle'),
    __metadata("design:paramtypes", [feature_toggle_service_1.FeatureToggleService])
], FeatureToggleController);
//# sourceMappingURL=feature-toggle.controller.js.map