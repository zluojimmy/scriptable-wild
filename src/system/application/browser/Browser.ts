class Browser {

  static get Url(): typeof Url {
    return importModule("Url");
  }

  static get UrlParts(): typeof UrlParts {
    return Browser.Url.UrlParts;
  }

  static get Api(): typeof Api {
    return importModule("Api");
  }

  static get Callback(): typeof Callback {
    return importModule("Callback");
  }

  static get Endpoint(): typeof Endpoint {
    return importModule("Endpoint");
  }

  static get Common(): typeof Common {
    return importModule("./system/application/common/Common");
  }

}

module.exports = Browser;