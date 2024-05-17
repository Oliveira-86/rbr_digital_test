export class Result {
  constructor(
    public success: boolean,
    public statusCode: number,
    public data: unknown,
    public message: unknown,
  ) {}
}