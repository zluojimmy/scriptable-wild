// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: share;
namespace Amazon {
  const shortcut: typeof Shortcut = importModule("system/Shortcut");

  export class Amazon extends shortcut {
    runtime(): boolean {
      const storageFilename: string = "last-run.txt";

      const latestRunString: string = this.readStorage(storageFilename);
      const latestRunTime: Date = (
        (latestRunString === String())?
          new Date()
          :new Date(latestRunString)
      )
      ?? new Date();

      this.writeStorage(
        (new Date()).toISOString(),
        storageFilename
      );
      return (Date.now() - latestRunTime.getTime()) > 300000;
    }
  }
}

new Amazon.Amazon().run();
