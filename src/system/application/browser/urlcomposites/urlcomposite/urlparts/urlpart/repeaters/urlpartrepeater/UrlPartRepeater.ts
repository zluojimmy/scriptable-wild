abstract class UrlPartRepeater {
  readonly value: null | string;

  constructor(repeater: null | string) {
    try {
      this.value =
        repeater === null || repeater === "" ? null : this.parse(repeater);
      if (this.value === "") this.value = null;
    } catch (e) {
      throw new Error(
        `UrlPartRepeater: constructor: error creating UrlPartRepeater: ${e}`,
      );
    }
  }

  protected abstract parse(repeater: string): null | string;

  get isValid(): boolean {
    try {
      return this.value !== null;
    } catch (e) {
      throw new Error(
        `UrlPartRepeater: isValid: error checking if UrlPartRepeater is valid: ${e}`,
      );
    }
  }

  toString(): string {
    try {
      return this.value ?? "";
    } catch (e) {
      throw new Error(
        `UrlPartRepeater: toString: error converting UrlPartRepeater to string: ${e}`,
      );
    }
  }

  protected get UrlValidators(): typeof UrlValidators {
    try {
      return UrlPartRepeater.UrlValidators;
    } catch (e) {
      throw new ReferenceError(
        `UrlPartRepeater: error loading parent UrlValidators module: ${e}`,
      );
    }
  }

  static get UrlValidators(): typeof UrlValidators {
    try {
      return importModule("validators/UrlValidators");
    } catch (e) {
      throw new ReferenceError(
        `UrlPartRepeater: error loading parent UrlValidators module: ${e}`,
      );
    }
  }
}

module.exports = UrlPartRepeater;
