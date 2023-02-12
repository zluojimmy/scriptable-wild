const _Bookmark: typeof Bookmark = importModule("bookmark/Bookmark");
class File {
  #subpath: string = String();
  readonly bookmark: Bookmark;
  constructor();
  constructor(
    subpath: string
  );
  constructor(
    bookmark: Bookmark,
    subpath?: string
  );
  constructor(
    file: File,
    relativePath?: string
  );
  constructor(
    base: Bookmark
      | File
      | string = new _Bookmark(),
    subpath: string = String()
  ) {
    if (base instanceof _Bookmark) {
      this.bookmark = base;
      this.subpath = subpath;
    }
    else if (base instanceof File) {
      this.bookmark = base.bookmark;
      this.subpath = File.Paths.walkPath(
        base.subpath,
        subpath
      );
    }
    else {
      this.bookmark = new _Bookmark();
      this.subpath = base;
    }
  }

  get bookmarkedPath(): string {
    return this.bookmark.path;
  }

  get data(): string {
    return this.isReadable ?
      File.m.readString(this.path)
      : String();
  }

  get descendants(): File[] {
    return this.isFile ?
      [this]
      : this.isBottom ?
        []
        : !this.isDirectory ?
          []
          : this.ls.map(
            (leaf: string): string => (
              File.Paths.joinPaths(
                this.subpath,
                File.Paths.trimPath(leaf)
              )
            )
          ).map(
            (subpath: string): File => (
              new File(subpath)
            )
          ).filter(
            (file: File) => (
              !this.path
                .startsWith(
                  file.path
                )
            )
          ).map(
            (file: File):
              Array<File> => (
              file.descendants
            )
          ).flat(1);
  }

  get exists(): boolean {
    return this.parentExists
      && File.m
        .fileExists(this.path);
  }

  get isBottom(): boolean {
    return this.isFile
      || (
        Array.isArray(this.ls)
        && this.ls.length === 0
      );
  }

  get isDirectory(): boolean {
    return File.m
      .isDirectory(this.path);
  }

  get isEnumerable(): boolean {
    return this.isDirectory;
  }

  get isFile(): boolean {
    return this.exists
      && !this.isDirectory;
  }

  get isReadable(): boolean {
    return this.isFile;
  }

  get isTop(): boolean {
    return this
      .subpath === this
        .parentSubpath;
  }

  get leaf(): string {
    return File.Paths.trimPath(
      this.path
        .split("/")
        .slice(-1)
        .shift()
      ?? String()
    );
  }

  get ls(): Array<string> {
    return this.isDirectory ?
      File
        .m.listContents(
          this.path
        )
      : [];
  }

  get parent(): File {
    return new File(
      this.bookmark,
      this.parentSubpath
    );
  }

  get parentExists(): boolean {
    return this.parent
      .isDirectory;
  }

  get parentIsSelf(): boolean {
    return this.isTop;
  }

  get parentPath(): string {
    return this.parent
      .path;
  }

  get parentSubpath(): string {
    return File.Paths.trimPath(
      this.subpath
        .split("/")
        .slice(0, -1)
        .join("/")
    );
  }

  get path(): string {
    return File
      .Paths.joinPaths(
        this.root,
        this.subpath
      );
  }

  get pathTree(): Array<string> {
    return File
      .Paths.pathToTree(this.path);
  }

  get root(): string {
    return this.bookmarkedPath;
  }

  get subpath(): string {
    return this.#subpath;
  }

  set subpath(
    path: string
  ) {
    this.#subpath = File
      .Paths.trimPath(path);
  }

  get subpathTree(): Array<string> {
    return File
      .Paths.pathToTree(this.subpath);
  }

  cd(
    relativePath: string
  ): void {
    this.subpath = File.Paths.trimPath(
      this.subpathRelativeTo(
        File.Paths.trimPath(relativePath)
      )
    );
  }

  delete(
    force: boolean = false
  ): void {
    if (this.exists) {
      if (force)
        File.m.remove(
          this.path
        );
      else {
        const confirm: Alert = new Alert();
        confirm.message = String(
          "Are you sure you want to delete this file or folder (including all descendants)? Path: "
          + this.path
        );
        confirm.addDestructiveAction(
          "Yes, DELETE this file"
        );
        confirm.addCancelAction(
          "Cancel"
        );
        confirm.present().then(
          (userChoice: number) => (
            (userChoice === 0) ?
              File.m.remove(
                this.path
              )
              : console.log(
                "User canceled file deletion."
              )
          )
        );
      }
    }
  }

  pathRelativeTo(
    relativePath: string
  ): string {
    return File.Paths.trimPath(
      File.Paths.walkPath(
        this.path,
        File.Paths.trimPath(relativePath)
      )
    );
  }

  read(): string {
    return this.data;
  }

  subpathRelativeTo(
    relativePath: string
  ): string {
    return File.Paths.trimPath(
      File.Paths.walkPath(
        this.subpath,
        File.Paths.trimPath(relativePath)
      )
    );
  }

  toString(): string {
    return this.path;
  }

  write(
    data: string,
    overwrite: boolean = false
  ): void {
    if (this.isDirectory)
      throw new ReferenceError(
        "File:write: File path points to a folder. Cannot write data to a folder."
      );
    else if (
      this.exists
      && !overwrite
    )
      throw new ReferenceError(
        "File:write: File already exists. To overwrite existing data, write must be called with overwrite === true."
      );
    else {
      if (!this.parentExists)
        File.m.createDirectory(
          this.parentPath,
          true
        );
      File.m.writeString(
        this.path,
        data
      );
    }
  }

  protected static get m(): FileManager {
    return FileManager.iCloud();
  }

  protected static get Paths(): typeof Paths {
    return importModule("./system/application/common/paths/Paths");
  }

}

module.exports = File;