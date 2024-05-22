declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'qa' | 'production';
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_M1_API_URL: string;
    NEXT_PUBLIC_M2_API_URL: string;
    NEXT_PUBLIC_API_USERNAME: string;
    NEXT_PUBLIC_API_PASSWORD: string;
    NEXT_PUBLIC_IDLE_TIME: number;
    NEXT_PUBLIC_SIGNOUT_TIME: number;
    FERNET_KEY: string;
    AUTH_URL: string;
    AUTH_SECRET: string;
    DRIZZLE_DATABASE_URI: string;
    DRIZZLE_DATABASE_HOST: string;
    DRIZZLE_DATABASE_PORT: number;
    DRIZZLE_DATABASE_USER: string;
    DRIZZLE_DATABASE_PASSWORD: string;
    DRIZZLE_DATABASE_NAME: string;
    AUTH_GITHUB_ID: string;
    AUTH_GITHUB_SECRET: string;
    WITH_AUTH: boolean;
  }
}
