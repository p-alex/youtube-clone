export interface DefaultResponse<Result> {
  success: boolean;
  errors: { message: string }[];
  result: Result;
}
