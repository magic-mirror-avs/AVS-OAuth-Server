declare interface IConfig {
    port: number;
    baseUrl: string;
    amazon: {
        email: string,
        password: string,
        clientId: string,
        secret: string,
    }
}