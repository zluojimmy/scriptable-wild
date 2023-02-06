// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: magic;

namespace TestRunner {
  
  
  
  
  
  
  
  
  
  
  
  
  // TestRunner imports
  const shortcut: typeof Shortcut = importModule("system/Shortcut");
  
  
  
  
  
  
  // TestRunner interfaces and classes
  type Evaluate = any;
  type Result = any;
  type TestCase = [Evaluate, Result];
  type TestCases = TestCase[];
  
  class TestSuite {
    readonly id: string,
    readonly cases: TestCases
    
    constructor(
      id: string,
      ...cases:
        Array<TestCase | TestCases>
    );
    
    constructor(
      id: string,
      testSuite?: TestSuite,
      ...moreCases:
        Array<TestCase | TestCases>
    );
    
    constructor(
      id: string,
      cases?:
        TestSuite
        | TestCase
        | TestCases,
      ...moreCases:
        Array<TestCase | TestCases>
    ) {
      this.id = id;
      if (cases === undefined)
        this.cases = [];
      else
        this.cases = this.parseInput(
          cases,
          ...moreCases
        );
    }
    
    run(
      suppressLogging: boolean = false
    ): boolean {
      if (!suppressLogging)
        this.cases.forEach(case => {
          console.log(
            case.length === 2 ?
              case.join(", ")
              : "ERROR: Incorrect test case syntax. "
          )
        });
      return this.cases
        .every(case => case.length === 2
          && case[0] === case[1]
        );
    }
    
    addCase(
      cases?:
        TestSuite
        | TestCase
        | TestCases,
      ...moreCases:
        Array<TestCase | TestCases>
    ): void {
      if (cases !== undefined)
        this.cases.push(
          ...this.parseInput(
            cases,
            ...moreCases
          )
        );
    }
    
    private parseInput(
      cases?:
        TestSuite
        | TestCase
        | TestCases,
      ...moreCases:
        Array<TestCase | TestCases>
    ): TestCases {
      return [
        cases instanceof TestSuite ?
          ...cases.cases
          : ...caseOrCasesToCases(cases),
        ...arrCaseCasesToCases(moreCases)
      ];
      
      function arrCaseCasesToCases(
        moreCases: Array<TestCase | TestCases>
      ): TestCases {
        const cases: TestCases = [];
        moreCases.forEach(caseOrCases => {
          cases.push(
            ...toCases(caseOrCases)
          );
        });
        return cases;
      }
      
      function caseOrCasesToCases(
        caseOrCases: TestCase | TestCases
      ): TestCases {
        return caseOrCases === [] ?
          []
          : Array.isArray(caseOrCases[0])?
            [...caseOrCases]
            : [caseOrCases];
      }
    }
  }
}