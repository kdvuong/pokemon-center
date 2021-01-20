interface ErrorObject {
  response: {
    data: {
      statusCode: number;
      message: string;
    };
  };
}

export class ServiceError {
  private readonly statusCode: number;
  private readonly message: string;

  constructor(error: ErrorObject) {
    this.statusCode = error.response.data.statusCode;
    this.message = error.response.data.message;
  }
}
