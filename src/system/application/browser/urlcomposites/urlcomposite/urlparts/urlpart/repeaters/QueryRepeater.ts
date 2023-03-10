const qu_UrlPartRepeater: typeof UrlPartRepeater = importModule(
  "urlpartrepeater/UrlPartRepeater",
);

class QueryRepeater extends qu_UrlPartRepeater {
  protected parse(repeater: string): null | string {
    try {
      return new QueryRepeater.ValidQueryRepeater(repeater).value;
    } catch (e) {
      throw new Error(
        `QueryRepeater: parse: error parsing QueryRepeater: \n${e}`,
      );
    }
  }

  static get ValidQueryRepeater(): typeof ValidQueryRepeater {
    try {
      return QueryRepeater.UrlValidators.Query.Repeaters.Query;
    } catch (e) {
      throw new ReferenceError(
        `QueryRepeater: error loading ValidQueryRepeater module: \n${e}`,
      );
    }
  }

  static get UrlPartRepeater(): typeof UrlPartRepeater {
    try {
      return qu_UrlPartRepeater;
    } catch (e) {
      throw new ReferenceError(
        `QueryRepeater: error loading parent UrlPartRepeater module: \n${e}`,
      );
    }
  }
}

module.exports = QueryRepeater;
