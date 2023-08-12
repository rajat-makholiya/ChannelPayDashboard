import { Constants } from "../../../common/Constants";
import HTTPStatusCode from "../../../domain/enums/httpStatusCode";
import { User } from "../../../domain/models/auth/user";
import { OtpLogin } from "../../../domain/usages/auth/otp-login";
import { UserLogin } from "../../../domain/usages/auth/user-login";
import { HttpConstants } from "../../protocols/http/http-constants";
import { HttpPostClient } from "../../protocols/http/http-post-client";

export class RemoteUserLogin implements UserLogin {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async login(params: UserLogin.Params): Promise<any> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
      headers: {
        [HttpConstants.CONTENT_TYPE]: HttpConstants.APPLICATION_JSON,
        [HttpConstants.ACCEPT]: HttpConstants.APPLICATION_JSON,
      },
      authHeaders: false,
    });

    if (!httpResponse) {
      let response: User = {} as User;
      response.errors = {
        message: Constants.SERVER_ERROR,
      };
      return response;
    } else {
      return httpResponse;
    }
  }
}
