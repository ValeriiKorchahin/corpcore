import cors from 'cors';

const allowedOrigins = [
    'http://localhost:4200',
];

export const corsConfig = () => {
    return cors({
        origin: allowedOrigins,
        methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['X-Total-Count'],
        credentials: true,
        maxAge: 86400,
    });
};
