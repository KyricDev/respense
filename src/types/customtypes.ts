import { User as modelUser } from '../models/user.js';

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