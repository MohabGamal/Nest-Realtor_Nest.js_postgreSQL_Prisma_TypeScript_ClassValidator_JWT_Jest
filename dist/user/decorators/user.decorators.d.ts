export interface IJWTPayload {
    id: number;
    name: string;
    iat: number;
    exp: number;
}
export declare const User: (...dataOrPipes: any[]) => ParameterDecorator;
