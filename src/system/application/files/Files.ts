class Files {

  static get ReadOnlyFile(): typeof ReadOnlyFile {
    return importModule("ReadOnlyFile");
  }

  static get File(): typeof File {
    return Files.ReadOnlyFile.File;
  }

  static get Bookmark(): typeof Bookmark {
    return Files.File.Bookmark;
  }

  static get Common(): typeof Common {
    return importModule("./system/application/common/Common");
  }

}

module.exports = Files;
