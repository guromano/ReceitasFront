export class Result<T>{
    public isSuccess:boolean;
    public response:T;
    public errors:string[];
}