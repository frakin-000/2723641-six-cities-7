export type AppConfig = {
  port: number;
  dbHost: string;
  salt: string;
};

export interface Config {
  get<K extends keyof AppConfig>(key: K): AppConfig[K];
}