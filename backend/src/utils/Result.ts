export class Result {
  constructor(
    public success: boolean,
    public statusCode: number,
    public result: unknown,
    public message: unknown,
  ) {}
}
