const _Config: typeof Config = importModule("appdata/Config");
const _Storage: typeof Storage = importModule("appdata/Storage");

abstract class Application {
  abstract get input(): any;
  abstract runtime(input: any): any;
  abstract handleOutput(output: any): any;

  run(): any {
    return this.handleOutput(
      this.runtime(
        this.input
      )
    );
  }

  protected get configSubdirectoryPath(): string {
    return String("Application");
  }

  protected get storageSubdirectoryPath(): string {
    return this.configSubdirectoryPath;
  }

  get config(): Config {
    return new _Config(
      this.configSubdirectoryPath,
      this.constructor.name
    );
  }

  protected storage(
    subpath?: string | undefined
  ): Storage {
    return new _Storage(
      this.storageSubdirectoryPath,
      this.constructor.name,
      subpath
    );
  }

  readStorage(
    subpath?: string | undefined
  ): string {
    return this
      .storage(subpath)
      .read();
  }

  writeStorage(
    text: string,
    subpath?: string | undefined
  ): void {
    this
      .storage(subpath)
      .write(text);
  }
}

module.exports = Application;