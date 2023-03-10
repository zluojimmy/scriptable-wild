class Repeaters {
  static get UrlPartRepeater(): typeof UrlPartRepeater {
    try {
      return Repeaters.PathRepeater.UrlPartRepeater;
    } catch (e) {
      throw new ReferenceError(
        `Repeaters: error loading parent UrlPartRepeater module: \n${e}`,
      );
    }
  }

  static get UrlValidators(): typeof UrlValidators {
    try {
      return Repeaters.UrlPartRepeater.UrlValidators;
    } catch (e) {
      throw new ReferenceError(
        `Repeaters: error loading UrlValidators module: \n${e}`,
      );
    }
  }

  static get HostIPv4Repeater(): typeof HostIPv4Repeater {
    try {
      return importModule("HostIPv4Repeater");
    } catch (e) {
      throw new ReferenceError(
        `Repeaters: error loading HostIPv4Repeater module: \n${e}`,
      );
    }
  }

  static get HostIPv6Repeater(): typeof HostIPv6Repeater {
    try {
      return importModule("HostIPv6Repeater");
    } catch (e) {
      throw new ReferenceError(
        `Repeaters: error loading HostIPv6Repeater module: \n${e}`,
      );
    }
  }

  static get HostRegNameRepeater(): typeof HostRegNameRepeater {
    try {
      return importModule("HostRegNameRepeater");
    } catch (e) {
      throw new ReferenceError(
        `Repeaters: error loading HostRegNameRepeater module: \n${e}`,
      );
    }
  }

  static get PathRepeater(): typeof PathRepeater {
    try {
      return importModule("PathRepeater");
    } catch (e) {
      throw new ReferenceError(
        `Repeaters: error loading PathRepeater module: \n${e}`,
      );
    }
  }

  static get QueryRepeater(): typeof QueryRepeater {
    try {
      return importModule("QueryRepeater");
    } catch (e) {
      throw new ReferenceError(
        `Repeaters: error loading QueryRepeater module: \n${e}`,
      );
    }
  }
}

module.exports = Repeaters;
