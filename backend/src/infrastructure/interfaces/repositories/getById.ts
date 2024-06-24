export interface GetById {
    getById<T extends any, S = string>(arg: S): boolean;
}
