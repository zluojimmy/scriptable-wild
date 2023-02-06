const pqf_UrlComposite: typeof UrlComposite = importModule("urlcomposite/UrlComposite");

class PathQueryFragment extends pqf_UrlComposite {
  readonly parts: [PathQuery, Fragment];
  readonly pathQuery: PathQuery;
  readonly fragment: Fragment;

  constructor(pathQueryFragment?: PathQueryFragment)
  constructor(
    pathQuery?:
      PathQuery
      | [
        string | Path,
        string | Query
      ],
    fragment?:
      string | Fragment
  );

  constructor(
    pathOrPathQueryOrPathQueryFragment?:
      | PathQuery
      | [
        string | Path,
        string | Query
      ]
      | PathQueryFragment,
    fragment?: string | Fragment
  ) {
    super();
    this.parts = pathOrPathQueryOrPathQueryFragment === undefined ?
      [
        new PathQueryFragment._PathQuery(),
        new PathQueryFragment._Fragment()
      ]
      : pathOrPathQueryOrPathQueryFragment instanceof PathQueryFragment ?
        pathOrPathQueryOrPathQueryFragment.parts
        : Array.isArray(pathOrPathQueryOrPathQueryFragment) ?
          [
            new PathQueryFragment._PathQuery(
              new PathQueryFragment._PathQuery._Path(pathOrPathQueryOrPathQueryFragment[0]),
              new PathQueryFragment._PathQuery._Query(pathOrPathQueryOrPathQueryFragment[1])
            ),
            new PathQueryFragment._Fragment(fragment)
          ]
          : [
            new PathQueryFragment._PathQuery(pathOrPathQueryOrPathQueryFragment),
            new PathQueryFragment._Fragment(fragment)
          ];
    this.pathQuery = this.parts[0];
    this.fragment = this.parts[1];
  }

  get composite(): string {
    return this.fragment.isValid ?
      [
        this.pathQuery.toString(),
        this.fragment.toString()
      ].join("#")
      : this.pathQuery.toString()
  }
}

namespace PathQueryFragment {
  export const _PathQuery: typeof PathQuery = importModule("PathQuery");
  export const _Fragment: typeof Fragment = importModule("urlparts/Fragment");
}

module.exports = PathQueryFragment;
