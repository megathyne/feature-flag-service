import { Controller, Get, HttpCode, HttpStatus, Param, Query } from '@nestjs/common';
import { FeatureToggleService } from './feature-toggle.service';
import { GetFeatureToggleDto } from './dto/get-feature-toggle.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('feature-toggle')
export class FeatureToggleController {
    constructor(private readonly featureToggleService: FeatureToggleService) { }

    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Get a feature toggle value" })
    @Get(':flagKey')
    getFeatureToggle(@Param('flagKey') flagKey: string, @Query() getFeatureToggleDto: GetFeatureToggleDto): Promise<boolean> {
        return this.featureToggleService.getFlagValue(flagKey, getFeatureToggleDto);
    }
}
