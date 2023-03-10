const po_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Port extends po_UrlPart {
  constructor(port?: string | number | Port) {
    try {
      super(
        typeof port === "number"
          ? Number.isInteger(port)
            ? String(Math.round(port))
            : ""
          : port,
      );
    } catch (e) {
      throw new Error(`Port: constructor: error creating Port: \n${e}`);
    }
  }

  protected parse(port: string): null | string {
    try {
      const parsedPortString: string = new Port.ValidPort(port).toString();
      const parsedPortInt: number = Number.isInteger(
        Number.parseInt(parsedPortString),
      )
        ? Math.round(Number.parseInt(parsedPortString))
        : NaN;
      return parsedPortInt >= 1 && parsedPortInt <= 65535
        ? String(Math.round(parsedPortInt))
        : null;
    } catch (e) {
      throw new Error(`Port: parse: error parsing Port: \n${e}`);
    }
  }

  toNumber(coerceEmptyPortToZero: boolean = false): number {
    try {
      return this.isValid
        ? Math.abs(Math.round(Number.parseInt(this.toString())))
        : coerceEmptyPortToZero
        ? 0
        : NaN;
    } catch (e) {
      throw new Error(
        `Port: toNumber: error converting Port to number: \n${e}`,
      );
    }
  }

  static get ValidPort(): typeof ValidPort {
    try {
      return Port.UrlValidators.Port;
    } catch (e) {
      throw new ReferenceError(`Port: error loading ValidPort module: \n${e}`);
    }
  }

  static get UrlPart(): typeof UrlPart {
    try {
      return po_UrlPart;
    } catch (e) {
      throw new ReferenceError(`Port: error loading UrlPart module: \n${e}`);
    }
  }
}

module.exports = Port;
