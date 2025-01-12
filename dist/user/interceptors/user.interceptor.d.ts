import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
export declare class UserInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, handler: CallHandler): import("rxjs").Observable<any>;
}
