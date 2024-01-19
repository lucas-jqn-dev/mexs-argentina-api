import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    // KEYS
    private apiKeys: string[] = [];

    validateApiKey(apiKey: string) {
        this.apiKeys.push(process.env.API_KEY)
        return this.apiKeys.find(apiK => apiKey === apiK);
    }
}
