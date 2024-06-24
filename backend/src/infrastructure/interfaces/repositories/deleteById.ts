export interface DeleteById {
    deleteById<T extends any, S = string>(arg: S): boolean;
}
