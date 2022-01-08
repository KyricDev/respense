import { User as modelUser } from '../models/user.js';
import express from 'express';

declare module 'express-serve-static-core'{
    export interface Request{
        user: modelUser;
    }
}

declare module 'passport'{
    namespace Express{
        export interface User{
            id: modelUser["id"];    
        }
    }
}

declare module 'express-session'{
    export interface SessionData{
        userid: modelUser["id"];
    }
}