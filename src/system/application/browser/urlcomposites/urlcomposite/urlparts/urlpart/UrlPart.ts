abstract class UrlPart {

  readonly _nominalType: string = "UrlPart";
  readonly value: null | string;

  constructor(
    part?:
      null
      | string
      | UrlPart
  ) {
    this.value = (
      part === null
      || part === undefined
      || part.toString() === ""
    ) ?
      null
      : this.parse(part.toString());
    if (this.value === "")
      this.value = null;
  }

  protected abstract parse(part: string): null | string;

  get isValid(): boolean {
    return this.value !== null;
  }

  toString(): string {
    return this.value ?? "";
  }

  static [Symbol.hasInstance](instance: any): boolean {
    return (
      instance !== null
      && instance !== undefined
      && typeof instance === "object"
      && "nominalType" in instance
      && instance.nominalType === "UrlPart"
    );
  }

  protected get UrlValidators(): typeof UrlValidators {
    return UrlPart.UrlValidators;
  }

  protected get Repeaters(): typeof Repeaters {
    return UrlPart.Repeaters;
  }

  protected static get UrlValidators(): typeof UrlValidators {
    return importModule("./system/application/browser/urlcomposites/urlparts/validators/UrlValidators");
  }

  protected static get Repeaters(): typeof Repeaters {
    return importModule("./system/application/browser/urlcomposites/urlparts/repeaters/Repeaters");
  }

}

module.exports = UrlPart;