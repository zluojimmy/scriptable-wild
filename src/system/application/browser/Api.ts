class Api {
  private _url: Url;
  private _method: Api.Method;
  private readonly _requestHeaders: RequestHeaders;
  private readonly _requestBody: RequestBody;
  private _timeoutSeconds: number;

  constructor(
    url: ConstructorParameters<typeof Url>[0],
    method: Api.Method = Api.Method.GET,
    {
      authScheme = "",
      authToken = "",
      requestBody = "",
      timeoutSeconds = 60,
    }: {
      authScheme?: ConstructorParameters<typeof RequestHeaders>[0];
      authToken?: ConstructorParameters<typeof RequestHeaders>[1];
      requestBody?: ConstructorParameters<typeof RequestBody>[0];
      timeoutSeconds?: number;
    },
    ...httpHeaders: Parameters<typeof RequestHeaders.prototype.addHeader>
  ) {
    try {
      this._url = new this.Url(url);
      this._method = method;
      this._requestHeaders = new this.RequestHeaders(
        authScheme,
        authToken,
        ...httpHeaders,
      );
      this._requestBody = new this.RequestBody(requestBody);
      this._timeoutSeconds = new this.PositiveFiniteInteger(timeoutSeconds)
        .isValidNumber
        ? timeoutSeconds
        : 60;
    } catch (e) {
      throw new Error(`Api: constructor: error creating Api: ${e}`);
    }
  }

  get url(): string {
    try {
      return this._url.toString();
    } catch (e) {
      throw new Error(`Api: get url: error getting url: ${e}`);
    }
  }

  set url(url: ConstructorParameters<typeof Url>[0]) {
    try {
      this._url = new Url(url);
    } catch (e) {
      throw new Error(`Api: set url: error setting url: ${e}`);
    }
  }

  get scheme(): string {
    try {
      return this._url.scheme;
    } catch (e) {
      throw new Error(`Api: get scheme: error getting scheme: ${e}`);
    }
  }

  set scheme(scheme: ConstructorParameters<typeof Scheme>[0]) {
    try {
      this._url.scheme = scheme;
    } catch (e) {
      throw new Error(`Api: set scheme: error setting scheme: ${e}`);
    }
  }

  get host(): string {
    try {
      return this._url.host;
    } catch (e) {
      throw new Error(`Api: get host: error getting host: ${e}`);
    }
  }

  set host(host: ConstructorParameters<typeof Host>[0]) {
    try {
      this._url.host = host;
    } catch (e) {
      throw new Error(`Api: set host: error setting host: ${e}`);
    }
  }

  get port(): string {
    try {
      return this._url.port;
    } catch (e) {
      throw new Error(`Api: get port: error getting port: ${e}`);
    }
  }

  set port(port: ConstructorParameters<typeof Port>[0]) {
    try {
      this._url.port = port;
    } catch (e) {
      throw new Error(`Api: set port: error setting port: ${e}`);
    }
  }

  get path(): string {
    try {
      return this._url.path;
    } catch (e) {
      throw new Error(`Api: get path: error getting path: ${e}`);
    }
  }

  set path(path: ConstructorParameters<typeof Path>[0]) {
    try {
      this._url.path = path;
    } catch (e) {
      throw new Error(`Api: set path: error setting path: ${e}`);
    }
  }

  get query(): string {
    try {
      return this._url.query;
    } catch (e) {
      throw new Error(`Api: get query: error getting query: ${e}`);
    }
  }

  set query(query: ConstructorParameters<typeof Query>[0]) {
    try {
      this._url.query = query;
    } catch (e) {
      throw new Error(`Api: set query: error setting query: ${e}`);
    }
  }

  addParam(...param: Parameters<Url["addParam"]>): this {
    try {
      this._url.addParam(...param);
      return this;
    } catch (e) {
      throw new Error(`Api: addParam: error adding param: ${e}`);
    }
  }

  deleteParam(...param: Parameters<Url["deleteParam"]>): this {
    try {
      this._url.deleteParam(...param);
      return this;
    } catch (e) {
      throw new Error(`Api: deleteParam: error deleting param: ${e}`);
    }
  }

  getParam(...param: Parameters<Url["getParam"]>): ReturnType<Url["getParam"]> {
    try {
      return this._url.getParam(...param);
    } catch (e) {
      throw new Error(`Api: getParam: error getting param: ${e}`);
    }
  }

  hasParam(...param: Parameters<Url["hasParam"]>): ReturnType<Url["hasParam"]> {
    try {
      return this._url.hasParam(...param);
    } catch (e) {
      throw new Error(`Api: hasParam: error checking param: ${e}`);
    }
  }

  get fragment(): string {
    try {
      return this._url.fragment;
    } catch (e) {
      throw new Error(`Api: get fragment: error getting fragment: ${e}`);
    }
  }

  set fragment(scheme: string | Scheme) {
    try {
      this._url.scheme = scheme;
    } catch (e) {
      throw new Error(`Api: set fragment: error setting fragment: ${e}`);
    }
  }

  get method(): typeof Api.prototype._method {
    try {
      return this._method;
    } catch (e) {
      throw new Error(`Api: get method: error getting method: ${e}`);
    }
  }

  set method(method: typeof Api.prototype._method) {
    try {
      this._method = method;
    } catch (e) {
      throw new Error(`Api: set method: error setting method: ${e}`);
    }
  }

  get hasAuth(): typeof RequestHeaders.prototype.hasAuth {
    try {
      return this._requestHeaders.hasAuth;
    } catch (e) {
      throw new Error(`Api: get hasAuth: error getting hasAuth: ${e}`);
    }
  }

  get authScheme(): typeof RequestHeaders.prototype.scheme {
    try {
      return this._requestHeaders.scheme;
    } catch (e) {
      throw new Error(`Api: get authScheme: error getting authScheme: ${e}`);
    }
  }

  set authScheme(scheme: typeof RequestHeaders.prototype.scheme) {
    try {
      this._requestHeaders.scheme = scheme;
    } catch (e) {
      throw new Error(`Api: set authScheme: error setting authScheme: ${e}`);
    }
  }

  get authToken(): typeof RequestHeaders.prototype.token {
    try {
      return this._requestHeaders.token;
    } catch (e) {
      throw new Error(`Api: get authToken: error getting authToken: ${e}`);
    }
  }

  set authToken(token: typeof RequestHeaders.prototype.token) {
    try {
      this._requestHeaders.token = token;
    } catch (e) {
      throw new Error(`Api: set authToken: error setting authToken: ${e}`);
    }
  }

  get auth(): typeof RequestHeaders.prototype.auth {
    try {
      return this._requestHeaders.auth;
    } catch (e) {
      throw new Error(`Api: get auth: error getting auth: ${e}`);
    }
  }

  set auth(auth: typeof RequestHeaders.prototype.auth) {
    try {
      this._requestHeaders.auth = auth;
    } catch (e) {
      throw new Error(`Api: set auth: error setting auth: ${e}`);
    }
  }

  deleteAuth(): this {
    try {
      this._requestHeaders.deleteAuth();
      return this;
    } catch (e) {
      throw new Error(`Api: deleteAuth: error deleting auth: ${e}`);
    }
  }

  get headers(): typeof RequestHeaders.prototype.headers {
    try {
      return this._requestHeaders.headers;
    } catch (e) {
      throw new Error(`Api: get headers: error getting headers: ${e}`);
    }
  }

  get headersStringObject(): typeof Request.prototype.headers {
    try {
      return Object.fromEntries(
        [...this._requestHeaders.headers.entries()].map(([key, value]) => [
          key,
          value.toString(),
        ]),
      );
    } catch (e) {
      throw new Error(
        `Api: get headersStringObject: error getting headersStringObject: ${e}`,
      );
    }
  }

  get headersString(): string {
    try {
      return this._requestHeaders.toString();
    } catch (e) {
      throw new Error(
        `Api: get headersString: error getting headersString: ${e}`,
      );
    }
  }

  get headerKeys(): typeof RequestHeaders.prototype.keys {
    try {
      return this._requestHeaders.keys;
    } catch (e) {
      throw new Error(`Api: get headerKeys: error getting headerKeys: ${e}`);
    }
  }

  hasHeader(
    ...header: Parameters<RequestHeaders["hasHeader"]>
  ): ReturnType<RequestHeaders["hasHeader"]> {
    try {
      return this._requestHeaders.hasHeader(...header);
    } catch (e) {
      throw new Error(`Api: hasHeader: error checking header: ${e}`);
    }
  }

  addHeader(...header: Parameters<RequestHeaders["addHeader"]>): this {
    try {
      this._requestHeaders.addHeader(...header);
      return this;
    } catch (e) {
      throw new Error(`Api: addHeader: error adding header: ${e}`);
    }
  }

  getValue(
    ...header: Parameters<RequestHeaders["getValue"]>
  ): ReturnType<RequestHeaders["getValue"]> {
    try {
      return this._requestHeaders.getValue(...header);
    } catch (e) {
      throw new Error(`Api: getValue: error getting header value: ${e}`);
    }
  }

  getStringValue(
    ...header: Parameters<RequestHeaders["getStringValue"]>
  ): ReturnType<RequestHeaders["getStringValue"]> {
    try {
      return this._requestHeaders.getStringValue(...header);
    } catch (e) {
      throw new Error(`Api: getStringValue: error getting header value: ${e}`);
    }
  }

  getNullableValue(
    ...header: Parameters<RequestHeaders["getNullableValue"]>
  ): ReturnType<RequestHeaders["getNullableValue"]> {
    try {
      return this._requestHeaders.getNullableValue(...header);
    } catch (e) {
      throw new Error(
        `Api: getNullableValue: error getting header value: ${e}`,
      );
    }
  }

  getHeader(
    ...header: Parameters<RequestHeaders["getHeader"]>
  ): ReturnType<RequestHeaders["getHeader"]> {
    try {
      return this._requestHeaders.getHeader(...header);
    } catch (e) {
      throw new Error(`Api: getHeader: error getting header: ${e}`);
    }
  }

  deleteHeader(...header: Parameters<RequestHeaders["deleteHeader"]>): this {
    try {
      this._requestHeaders.deleteHeader(...header);
      return this;
    } catch (e) {
      throw new Error(`Api: deleteHeader: error deleting header: ${e}`);
    }
  }

  get body(): typeof Api.prototype.bodyString {
    try {
      return this.bodyString;
    } catch (e) {
      throw new Error(`Api: get body: error getting body: ${e}`);
    }
  }

  get bodyString(): ReturnType<RequestBody["toString"]> {
    try {
      return this._requestBody.toString();
    } catch (e) {
      throw new Error(`Api: get bodyString: error getting bodyString: ${e}`);
    }
  }

  get bodyObject(): ReturnType<RequestBody["toObject"]> {
    try {
      return this._requestBody.toObject();
    } catch (e) {
      throw new Error(`Api: get bodyObject: error getting bodyObject: ${e}`);
    }
  }

  get bodyStringObject(): ReturnType<RequestBody["toStringObject"]> {
    try {
      return this._requestBody.toStringObject();
    } catch (e) {
      throw new Error(
        `Api: get bodyStringObject: error getting bodyStringObject: ${e}`,
      );
    }
  }

  get timeout(): number {
    try {
      return this._timeoutSeconds;
    } catch (e) {
      throw new Error(`Api: get timeout: error getting timeout: ${e}`);
    }
  }

  set timeout(timeoutSeconds: number) {
    try {
      if (new this.PositiveFiniteInteger(timeoutSeconds).isValidNumber)
        this._timeoutSeconds = timeoutSeconds;
    } catch (e) {
      throw new Error(`Api: set timeout: error setting timeout: ${e}`);
    }
  }

  request(): any {
    try {
      return this.handleRequest().response;
    } catch (e) {
      throw new Error(`Api: request: error making request: ${e}`);
    }
  }

  requestObject(): any {
    try {
      return this.handleRequest().toObject();
    } catch (e) {
      throw new Error(`Api: requestObject: error making request: ${e}`);
    }
  }

  requestString(): string {
    try {
      return this.handleRequest().toString();
    } catch (e) {
      throw new Error(`Api: requestString: error making request: ${e}`);
    }
  }

  private handleRequest(): ResponseBody {
    var response: string = "";
    const req: Request = new Request(this.url);
    req.headers = this.headersStringObject;
    req.body = this.body;
    req.method = Api.Method[this.method];
    req.timeoutInterval = this.timeout;
    req.loadString().then(_response => {
      response = _response;
    });
    try {
      return new this.ResponseBody(response);
    } catch (e) {
      throw new Error(`Api: handleRequest: error handling request: ${e}`);
    }
  }

  get Url(): typeof Url {
    try {
      return Api.Url;
    } catch (e) {
      throw new Error(`Api: get Url: error getting Url: ${e}`);
    }
  }

  get RequestHeaders(): typeof RequestHeaders {
    try {
      return Api.RequestHeaders;
    } catch (e) {
      throw new Error(
        `Api: get RequestHeaders: error getting RequestHeaders: ${e}`,
      );
    }
  }

  get RequestBody(): typeof RequestBody {
    try {
      return Api.RequestBody;
    } catch (e) {
      throw new Error(`Api: get RequestBody: error getting RequestBody: ${e}`);
    }
  }

  get ResponseBody(): typeof ResponseBody {
    try {
      return Api.ResponseBody;
    } catch (e) {
      throw new Error(
        `Api: get ResponseBody: error getting ResponseBody: ${e}`,
      );
    }
  }

  private get PositiveFiniteInteger(): typeof PositiveFiniteInteger {
    try {
      return Api.PositiveFiniteInteger;
    } catch (e) {
      throw new Error(
        `Api: get PositiveFiniteInteger: error getting PositiveFiniteInteger: ${e}`,
      );
    }
  }

  static get Url(): typeof Url {
    try {
      return importModule("Url");
    } catch (e) {
      throw new Error(`Api: get Url: error getting Url: ${e}`);
    }
  }

  static get ApiParts(): typeof ApiParts {
    try {
      return importModule("apiparts/ApiParts");
    } catch (e) {
      throw new Error(`Api: get ApiParts: error getting ApiParts: ${e}`);
    }
  }

  static get RequestParts(): typeof RequestParts {
    try {
      return Api.ApiParts.RequestParts;
    } catch (e) {
      throw new Error(
        `Api: get RequestParts: error getting RequestParts: ${e}`,
      );
    }
  }

  static get RequestHeaders(): typeof RequestHeaders {
    try {
      return Api.RequestParts.RequestHeaders;
    } catch (e) {
      throw new Error(
        `Api: get RequestHeaders: error getting RequestHeaders: ${e}`,
      );
    }
  }

  static get RequestBody(): typeof RequestBody {
    try {
      return Api.RequestParts.RequestBody;
    } catch (e) {
      throw new Error(`Api: get RequestBody: error getting RequestBody: ${e}`);
    }
  }

  static get ResponseParts(): typeof ResponseParts {
    try {
      return Api.ApiParts.ResponseParts;
    } catch (e) {
      throw new Error(
        `Api: get ResponseParts: error getting ResponseParts: ${e}`,
      );
    }
  }

  static get ResponseBody(): typeof ResponseBody {
    try {
      return Api.ResponseParts.ResponseBody;
    } catch (e) {
      throw new Error(
        `Api: get ResponseBody: error getting ResponseBody: ${e}`,
      );
    }
  }

  static get Types(): typeof Types {
    try {
      return importModule("./common/types/Types");
    } catch (e) {
      throw new Error(`Api: get Types: error getting Types: ${e}`);
    }
  }

  static get PositiveFiniteInteger(): typeof PositiveFiniteInteger {
    try {
      return Api.Types.Numbers.PositiveFiniteInteger;
    } catch (e) {
      throw new Error(
        `Api: get PositiveFiniteInteger: error getting PositiveFiniteInteger: ${e}`,
      );
    }
  }
}

namespace Api {
  export enum Method {
    GET,
    POST,
    PUT,
    DELETE,
  }

  export enum AuthScheme {
    Bearer,
    Basic,
    Digest,
  }
}

module.exports = Api;
