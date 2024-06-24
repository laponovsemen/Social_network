type HasError = {
    error: string;
};
type NoError<T> = {
    data: T;
};
type NoticePayload<T> = NoError<T> | HasError;
type Notice<T = undefined> = {
    code: number;
} & NoticePayload<T>;

export class InterlayerNotice<T = any> {
    private code: number;
    private error: string[] = [];
    private data: T;
    constructor({
        code,
        data,
        error,
    }: {
        code?: number;
        data?: T;
        error?: string;
    }) {
        this.code = code;
        this.data = data;
        this.error.push(error);
    }
    public hasError() {
        return !!this.error.length;
    }
    public addError(error: string) {
        this.error.push(error);
    }
    public getCode() {
        return this.code;
    }
    public getData() {
        return this.data;
    }
    public get(): Notice<T> {
        return {
            code: this.code ?? this.hasError() ? 500 : 200,
            error: this.error.join(" | "),
            data: this.data,
        };
    }
}
