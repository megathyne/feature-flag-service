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
var SampleImplementationService_1;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleImplementationService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let SampleImplementationService = SampleImplementationService_1 = class SampleImplementationService {
    constructor(httpService) {
        this.httpService = httpService;
        this.logger = new common_1.Logger(SampleImplementationService_1.name);
    }
    async getFeatureFlagValue(flagKey, context) {
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`http://localhost:3000/feature-toggle/${flagKey}`, { params: context }).pipe((0, rxjs_1.catchError)((error) => {
            this.logger.error(error.response?.data);
            throw new common_1.InternalServerErrorException('An error happened!', error);
        })));
        return data;
    }
    async previousReleaseCode(a, b) {
        return a + b;
    }
    async newReleaseCode(a, b) {
        return a * b;
    }
    async sampleMethod() {
        const a = 1;
        const b = 2;
        try {
            const context = { kind: 'user', key: 'example-user-key', name: 'Sandy' };
            const isEnabled = await this.getFeatureFlagValue('sample-feature', context);
            return isEnabled ? this.newReleaseCode(a, b) : this.previousReleaseCode(a, b);
        }
        catch (error) {
            this.logger.error('Unhandled exception', error);
            throw new common_1.InternalServerErrorException('Unhandled exception', error);
        }
    }
};
exports.SampleImplementationService = SampleImplementationService;
exports.SampleImplementationService = SampleImplementationService = SampleImplementationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _a : Object])
], SampleImplementationService);
//# sourceMappingURL=sample-implementation.service.js.map