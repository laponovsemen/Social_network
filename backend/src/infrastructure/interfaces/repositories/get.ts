export interface Get {
    getAll<T extends any, S extends any>(arg: S): T[];
}
