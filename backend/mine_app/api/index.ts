import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { Handler } from 'express';

const server = express();

export const createNestServer = async (expressInstance: express.Express) => {
    const app = await NestFactory.create(
        AppModule,
        new ExpressAdapter(expressInstance),
    );

    app.enableCors({
        origin: true, // Allow all origins in production, configure as needed
        credentials: true,
    });

    app.setGlobalPrefix('api');

    await app.init();
    return app;
};

// Initialize the server
let cachedServer: express.Express;

const bootstrap = async (): Promise<express.Express> => {
    if (!cachedServer) {
        await createNestServer(server);
        cachedServer = server;
    }
    return cachedServer;
};

// Export for Vercel
export default async (req: any, res: any) => {
    const app = await bootstrap();
    app(req, res);
};
