import { SampleImplementationService } from './sample-implementation.service';
export declare class SampleImplementationController {
    private readonly sampleImplementationService;
    constructor(sampleImplementationService: SampleImplementationService);
    sampleMethod(): Promise<number>;
}
