declare var __ENV: string;
declare var angular;
declare var require: {
    
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void, name?: string) => void;
};