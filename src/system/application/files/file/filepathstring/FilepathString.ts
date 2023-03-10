class FilepathString {
  readonly _nominalType: string = "FilepathString";

  private readonly _path: string;

  constructor(
    path: string | string[] | FilepathString = "",
    requiredPathSegment: string = "",
  ) {
    try {
      this._path = this._parse(path, requiredPathSegment);
    } catch (e) {
      throw new Error(
        `FilepathString: constructor: Caught unhandled exception while instantiating FilepathString by parsing path: \n${e}`,
      );
    }
  }

  private _parse(
    path: ConstructorParameters<typeof FilepathString>[0],
    requiredPathSegment: string,
  ): string {
    try {
      const parsed: string = this._validate(path);
      return parsed.includes(requiredPathSegment) ? parsed : "";
    } catch (e) {
      throw new Error(
        `FilepathString: _parse: Caught unhandled exception while parsing path: \n${e}`,
      );
    }
  }

  private _validate(
    path: ConstructorParameters<typeof FilepathString>[0],
  ): string {
    try {
      return this._clean(path).some(
        node => new FilepathString.ValidFilepathRepeater(node).value === null,
      )
        ? ""
        : this._flattenRaw(this._clean(path));
    } catch (e) {
      throw new Error(
        `FilepathString: _validate: Caught unhandled exception while validating path: \n${e}`,
      );
    }
  }

  private _clean(
    path: ConstructorParameters<typeof FilepathString>[0],
  ): string[] {
    try {
      return new FilepathString.StringSplitter(this._treeifyRaw(path), "/", {
        trim: true,
        trimTokens: true,
        ignoreEmptyTokens: true,
      }).toTuple();
    } catch (e) {
      throw new Error(
        `FilepathString: _clean: Caught unhandled exception while cleaning path using StringSplitter instance: \n${e}`,
      );
    }
  }

  private _treeifyRaw(
    path: ConstructorParameters<typeof FilepathString>[0],
  ): string[] {
    try {
      return this._flattenRaw(path).split("/");
    } catch (e) {
      throw new Error(
        `FilepathString: _treeifyRaw: Caught unhandled exception while treeifying raw path: \n${e}`,
      );
    }
  }

  private _flattenRaw(
    path: ConstructorParameters<typeof FilepathString>[0] = "",
  ): string {
    try {
      return Array.isArray(path)
        ? path.join("/")
        : typeof path === "string"
        ? path
        : path.toString();
    } catch (e) {
      throw new Error(
        `FilepathString: _flattenRaw: Caught unhandled exception while flattening raw path: \n${e}`,
      );
    }
  }

  private _walk(
    relativePath: ConstructorParameters<typeof FilepathString>[0],
    backtrackOnDotDot: boolean = false,
  ): string[] {
    try {
      const relativeTree: string[] = this._treeifyRaw(
        this._validate(relativePath),
      );
      const walked: string[] = this.tree;
      for (const node of relativeTree) {
        if (node === ".." && backtrackOnDotDot) walked.pop();
        else walked.push(node);
      }
      return new FilepathString(walked).toTree();
    } catch (e) {
      throw new Error(
        `FilepathString: _walk: Caught unhandled exception while walking path: \n${e}`,
      );
    }
  }

  get tree(): string[] {
    try {
      return this._treeifyRaw(this._path);
    } catch (e) {
      throw new Error(
        `FilepathString: get tree: Caught unhandled exception while getting tree: \n${e}`,
      );
    }
  }

  get path(): string {
    try {
      return this._path;
    } catch (e) {
      throw new Error(
        `FilepathString: get path: Caught unhandled exception while getting path: \n${e}`,
      );
    }
  }

  get isEmpty(): boolean {
    try {
      return (
        this.tree.length === 0 ||
        this.tree[0] === undefined ||
        this.tree[0] === ""
      );
    } catch (e) {
      throw new Error(
        `FilepathString: get isEmpty: Caught unhandled exception while getting isEmpty: \n${e}`,
      );
    }
  }

  get parent(): string {
    try {
      return this.cd("..").toString();
    } catch (e) {
      throw new Error(
        `FilepathString: get parent: Caught unhandled exception while getting parent: \n${e}`,
      );
    }
  }

  get leaf(): string {
    try {
      return !this.isEmpty ? this.tree[this.tree.length - 1]! : "";
    } catch (e) {
      throw new Error(
        `FilepathString: get leaf: Caught unhandled exception while getting leaf: \n${e}`,
      );
    }
  }

  append(
    subpath: ConstructorParameters<typeof FilepathString>[0],
    requiredPathSegment: ConstructorParameters<typeof FilepathString>[1] = "",
  ): FilepathString {
    try {
      return new FilepathString(this._walk(subpath), requiredPathSegment);
    } catch (e) {
      throw new Error(
        `FilepathString: append: Caught unhandled exception while appending path by calling private FilepathString._walk(): \n${e}`,
      );
    }
  }

  cd(
    relativePath: ConstructorParameters<typeof FilepathString>[0],
    requiredPathSegment: ConstructorParameters<typeof FilepathString>[1] = "",
  ): FilepathString {
    try {
      return new FilepathString(
        this._walk(relativePath, true),
        requiredPathSegment,
      );
    } catch (e) {
      throw new Error(
        `FilepathString: cd: Caught unhandled exception while changing directories by calling private FilepathString._walk(): \n${e}`,
      );
    }
  }

  toTree(): typeof FilepathString.prototype.tree {
    try {
      return this.tree;
    } catch (e) {
      throw new Error(
        `FilepathString: toTree: Caught unhandled exception while getting tree: \n${e}`,
      );
    }
  }

  toString(): typeof FilepathString.prototype.path {
    try {
      return this.path;
    } catch (e) {
      throw new Error(
        `FilepathString: toString: Caught unhandled exception while getting path: \n${e}`,
      );
    }
  }

  static join(
    left: ConstructorParameters<typeof FilepathString>[0],
    right: ConstructorParameters<typeof FilepathString>[0] = "",
    requiredPathSegment: ConstructorParameters<typeof FilepathString>[1] = "",
  ): string {
    try {
      return new FilepathString(left)
        .append(right, requiredPathSegment)
        .toString();
    } catch (e) {
      throw new Error(
        `FilepathString: join: Caught unhandled exception while creating a new FilepathString to join paths: \n${e}`,
      );
    }
  }

  static mutate(
    path: ConstructorParameters<typeof FilepathString>[0],
    relativePath: ConstructorParameters<typeof FilepathString>[0] = "",
    requiredPathSegment: ConstructorParameters<typeof FilepathString>[1] = "",
  ): string {
    try {
      return new FilepathString(path)
        .cd(relativePath, requiredPathSegment)
        .toString();
    } catch (e) {
      throw new Error(
        `FilepathString: mutate: Caught unhandled exception while creating a new FilepathString to mutate path: \n${e}`,
      );
    }
  }

  static toString(
    path: ConstructorParameters<typeof FilepathString>[0],
  ): ReturnType<typeof FilepathString.prototype.toString> {
    try {
      return new FilepathString(path).toString();
    } catch (e) {
      throw new Error(
        `FilepathString: toString: Caught unhandled exception while creating a new FilepathString to convert path to string: \n${e}`,
      );
    }
  }

  static toTree(
    path: ConstructorParameters<typeof FilepathString>[0],
  ): ReturnType<typeof FilepathString.prototype.toTree> {
    try {
      return new FilepathString(path).toTree();
    } catch (e) {
      throw new Error(
        `FilepathString: toTree: Caught unhandled exception while creating a new FilepathString to convert path to tree: \n${e}`,
      );
    }
  }

  static [Symbol.hasInstance](instance: any): boolean {
    try {
      return (
        instance !== null &&
        instance !== undefined &&
        typeof instance === "object" &&
        "_nominalType" in instance &&
        (instance as FilepathString)._nominalType === "FilepathString"
      );
    } catch (e) {
      throw new Error(
        `FilepathString: [Symbol.hasInstance]: Caught unhandled exception while checking if instance is a FilepathString: \n${e}`,
      );
    }
  }

  static get ValidFilepathRepeater(): typeof ValidFilepathRepeater {
    try {
      return importModule("validfilepathrepeater/ValidFilepathRepeater");
    } catch (e) {
      throw new ReferenceError(
        `Filepath: Failed to import module ValidFilepathRepeater: \n${e}`,
      );
    }
  }

  static get StringSplitter(): typeof StringSplitter {
    try {
      return importModule("./common/types/strings/StringSplitter");
    } catch (e) {
      throw new ReferenceError(
        `Filepath: Failed to import module StringSplitter: \n${e}`,
      );
    }
  }

  static get Manager(): FileManager {
    try {
      return FileManager.iCloud();
    } catch (e) {
      throw new ReferenceError(
        `Filepath: Failed to get instance of Scriptable FileManager iCloud object: \n${e}`,
      );
    }
  }
}

module.exports = FilepathString;
