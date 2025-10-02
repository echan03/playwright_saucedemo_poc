
import * as fs from 'fs';
import * as path from 'path';

interface User {
    username: string;
    password: string;
}

interface TestConfig {
    url: string;
    users: {
        standard: User;
        locked_out: User;
        [key: string]: User;
    };
}

export class BaseTest {
    static config: TestConfig = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, 'test-config.json'), 'utf-8')
    );

    static get URL(): string {
        return this.config.url;
    }

    static get STANDARD_USER(): string {
        return this.config.users.standard.username;
    }

    static get STANDARD_PASSWORD(): string {
        return this.config.users.standard.password;
    }
}
