// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: gray; icon-glyph: magic; share-sheet-inputs: plain-text;
namespace Search {

  type searchConfigInterface = typeof import("./../config/Program/Shortcut/Search.json"); 
  
  const Program = importModule("./lib/Program")
  
  const Shortcut = Program.Shortcut;
  
  abstract class App {
    readonly name: string;
    constructor (name: string) {
      this.name = name;
    }
  }
  
  class MailApp extends App {
    constructor () {
      super("Mail");
    }
  }
  
  class FilesApp extends App {
    constructor () {
      super("Files");
    }
  }
  
  class ShortcutsApp extends App {
    constructor () {
      super("Shortcuts");
    }
  }
  
  class TokenizedQuery {
    readonly key: string;
    readonly terms: Array<string>;
    constructor (query: string) {
      const tokens: Array<string> = query
        .trim()
        .split(" ") as Array<string>;
      this.key = ((tokens as Array<string>)
        .shift() ?? String())
        .toLowerCase()
        .replace(".", "") as string;
      this.terms = tokens as Array<string>;
    }
  }
  
  abstract class Engine {
    readonly keys: Array<string>;
    constructor(keys: Array<string>) {
      this.keys = keys;
    }
  
    abstract run(query: TokenizedQuery): any;
  }
  
  class WebEngine extends Engine {
    readonly urls: Array<string>;
    readonly querytag: string;
    readonly webview: boolean;
    constructor (
      keys: Array<string>,
      urls: Array<string>,
      querytag: string,
      webview?: boolean | undefined
    ) {
      super(keys);
      this.urls = urls;
      this.querytag = querytag;
      this.webview = webview? webview: false;
    }
  
    run(query: TokenizedQuery): any {
      const encodedQuery: string = query.terms.map((term) => (term.split("+").map((operand) => (encodeURI(operand))).join("\%2B"))).join("+");
  
      const actions: Array<string> = this.urls.map((url) => (url.replace(this.querytag, encodedQuery)));
  
      return {
        app: "Safari",
        actions: (this.webview? actions : actions.reverse()),
        webview: this.webview
      };
    }
  }
  
  class AppEngine extends Engine {
    readonly app: App;
    constructor (keys: string[], app: App) {
      super(keys);
      this.app = app;
    }
  
    run(query: TokenizedQuery): any {
      return {
        app: this.app.name,
        actions: query.terms.join(" ")
      };
    }
  }
  
  class Search extends Shortcut {
    runtime(args: any): any {
      const query: TokenizedQuery = new TokenizedQuery(
        (args.plainTexts as Array<string>)
        .shift() ?? String()
      );
      
      const config: searchConfigInterface = this["config"]["unmerged"] as searchConfigInterface;
  
      const querytag: string = config.user
        .queryTag;
      
      type appKey = "mail"
        | "files"
        | "shortcuts";
      
      const appToEngine = {
        "mail": MailApp,
        "files": FilesApp,
        "shortcuts": ShortcutsApp
      };
  
      const engines: Array<Engine> = config.user
        .engineKeys
        .map(
          (engine) => (
            engine.urls?
              new WebEngine(
                engine.keys,
                Array.isArray(
                  engine.urls
                )?
                  engine.urls
                  :[engine.urls],
                querytag,
                engine.webview
              )
              :new AppEngine(
                engine.keys,
                new appToEngine[
                  engine.app as appKey
                ]()
              )
          )
        );
      
      const engine: Engine | undefined = engines
        .find((engine: Engine) => (
          engine.keys.includes(
            query.key as string
          )
        )
        );
      
      return (engine === undefined)?
        null
        :engine.run(query);
    }
  }
  
  (new Search())["run"]();

}