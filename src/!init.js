// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: magic;
class Init {
  static init(
    reboot = false,
    doInitializeLibraries = false,
    doInitializeScripts = false 
  ) {
    // Bootstrap by loading system files from Repo/system (files that are core to operating Scriptable apps).
    if (reboot) {
      const Loader = importModule("boot/Loader");
      Loader.bootstrap();
    }
    
    // Use system files to initialize system.
    // Set arg1=true to load libraries from repo.
    // Set arg2=true to load Scripts from repo.
    const System = importModule("system/System");
    System.init(
      doInitializeLibraries,
      doInitializeScripts
    );
  }
}

Init.init(true, true, true);

module.exports = Init;
module.exports.Init = Init;
