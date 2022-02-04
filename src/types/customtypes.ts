import User from '../models/user.js';

declare module 'express-serve-static-core'{
    export interface Request{
        user: User;
    }
}

declare module 'express-session'{
    export interface SessionData{
        userid: User["id"];
        isOAuth: boolean;
        name: string;
    }
}