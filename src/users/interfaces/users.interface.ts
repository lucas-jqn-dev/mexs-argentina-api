import { Document } from "mongoose";

export interface User extends Document {
    clientId: string;
    clientSecret: string;
    roles: string[];
    createdAt: Date;
}