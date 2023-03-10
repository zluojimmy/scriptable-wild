class Types {
  static get Numbers(): typeof Numbers {
    try {
      return importModule("numbers/Numbers");
    } catch (e) {
      throw new ReferenceError("Types: error importing Numbers module");
    }
  }

  static get Strings(): typeof Strings {
    try {
      return importModule("strings/Strings");
    } catch (e) {
      throw new ReferenceError("Types: error importing Strings module");
    }
  }
}

module.exports = Types;
