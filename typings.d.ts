declare var __ENV: string;
declare var __VERSION: string;
declare var require: {
    
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
};