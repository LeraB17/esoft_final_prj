export interface IResponseData<T extends object> {
    count: number;
    data: T;
}
