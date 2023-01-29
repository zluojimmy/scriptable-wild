abstract class RealNumber {
  readonly bounds: RealNumber.Bounds;
  readonly cardinality: RealNumber.Cardinality;
  constructor(
    cardinality: RealNumber.Cardinality = new RealNumber.Cardinality.AnyCardinality(),
    bounds: RealNumber.Bounds = new RealNumber.Bounds.InfiniteBounds()
  ) {
    this.cardinality = cardinality;
    this.bounds = bounds;
  }

  abstract get number(): number;
  toNumber(): number {
    return this.number;
  }
  abstract get string(): string;
  toString(): string {
    return this.string;
  }
}

namespace RealNumber {
  export abstract class Bounds {
    isBounded(
      value: undefined | null | number
    ): boolean {
      return value !== undefined
        && value !== null
        && !Number.isNaN(value);
    }
  }

  export namespace Bounds {
    export class InfiniteBounds extends Bounds {}
    export class FiniteBounds extends Bounds {
      override isBounded(
        value: undefined | null | number
      ): boolean {
        return super.isBounded(value)
          && value !== Infinity
          && value !== -Infinity;
      }
    }
  }

  export abstract class Cardinality {
    isCardinal(
      value: undefined | null | number
    ): boolean {
      return value !== undefined
        && value !== null
        && !Number.isNaN(value);
    }
  }

  export namespace Cardinality {
    export class AnyCardinality extends Cardinality {}
    export class PositiveCardinality extends Cardinality {
      override isCardinal(
        value: undefined | null | number
      ): boolean {
        return super.isCardinal(value)
          && (
            value as number === 0
            || value as number === -0
            || value as number > 0
          );
      }
    }

    export class NegativeCardinality extends Cardinality {
      override isCardinal(
        value: undefined | null | number
      ): boolean {
        return super.isCardinal(value)
          && (
            value as number === 0
            || value as number === -0
            || value as number < 0
          );
      }
    }
  }

  export class Rational extends RealNumber {
    readonly value: number | null;
    constructor(
      value: Rational | number,
      cardinality?: Cardinality,
      bounds?: Bounds
    ) {
      super(cardinality, bounds);
      value = value instanceof Rational ?
        value.number
        : value;
      this.value = this.qualifies(value) ?
        value === -0 ?
          0
          : value
        : null;
    }

    protected qualifies(value: number): boolean {
      return this.bounds.isBounded(value)
        && this.cardinality.isCardinal(value);
    }

    get isNumber(): boolean {
      return !(this.value === null);
    }

    get isFinite(): boolean {
      return Number.isFinite(this.number);
    }

    get isInfinite(): boolean {
      return this.isPositiveInfinite
        || this.isNegativeInfinite;
    }

    get isPositiveInfinite(): boolean {
      return this.number === Infinity;
    }

    get isNegativeInfinite(): boolean {
      return this.number === -Infinity;
    }

    get isZero(): boolean {
      return this.number === 0;
    }

    get isStrictlyPositive(): boolean {
      return this.number > 0;
    }

    get isStrictlyNegative(): boolean {
      return this.number < 0;
    }

    get isPositive(): boolean {
      return this.isZero
        || this.isStrictlyPositive;
    }

    get isNegative(): boolean {
      return this.isZero
        || this.isStrictlyNegative;
    }

    get isInteger(): boolean {
      return Number.isInteger(this.number);
    }

    get string(): string {
      return this.isNumber ?
        String()
        : String(this.value);
    }

    get number(): number {
      return this.isNumber ?
        this.value as number
        : NaN;
    }
  }

  export namespace Rational {
    export class PositiveNumber extends Rational {
      constructor(
        value: Rational | number,
        bounds?: Bounds
      ) {
        super(value, new Cardinality.PositiveCardinality(), bounds);
      }
    }

    export class NegativeNumber extends Rational {
      constructor(
        value: Rational | number,
        bounds?: Bounds
      ) {
        super(value, new Cardinality.NegativeCardinality(), bounds);
      }
    }

    export class FiniteNumber extends Rational {
      constructor(
        value: Rational | number,
        cardinality?: Cardinality
      ) {
        super(value, cardinality, new Bounds.FiniteBounds());
      }
    }

    export namespace FiniteNumber {
      export class PositiveFiniteNumber extends FiniteNumber {
        constructor(value: Rational | number) {
          super(value, new Cardinality.PositiveCardinality());
        }
      }

      export class NegativeFiniteNumber extends FiniteNumber {
        constructor(value: Rational | number) {
          super(value, new Cardinality.NegativeCardinality());
        }
      }
    }

    export class Integer extends Rational {
      protected override qualifies(value: number): boolean {
        return super.qualifies(value)
          && Number.isInteger(value);
      }
    }

    export namespace Integer {
      export class PositiveInteger extends Integer {
        constructor(
          value: Rational | number,
          bounds?: Bounds
        ) {
          super(value, new Cardinality.PositiveCardinality(), bounds);
        }
      }

      export class NegativeInteger extends Integer {
        constructor(
          value: Rational | number,
          bounds?: Bounds
        ) {
          super(value, new Cardinality.NegativeCardinality(), bounds);
        }
      }

      export class FiniteInteger extends Integer {
        constructor(
          value: Rational | number,
          cardinality?: Cardinality
        ) {
          super(value, cardinality, new Bounds.FiniteBounds());
        }
      }

      export namespace FiniteInteger {
        export class PositiveFiniteInteger extends FiniteInteger {
          constructor(value: Rational | number) {
            super(value, new Cardinality.PositiveCardinality());
          }
        }

        export class NegativeFiniteInteger extends FiniteInteger {
          constructor(value: Rational | number) {
            super(value, new Cardinality.NegativeCardinality());
          }
        }
      }
    }
  }
}

namespace Validation {
  export class CharSet {
    readonly chars: string[];
    constructor(
      ...charSets: CharSet.CharSetInput[]
    ) {
      this.chars = new Array<string>();
      charSets.forEach(
        (charset: CharSet.CharSetInput) => {
          charset instanceof CharSet ?
            this.chars.push(
              ...charset.chars
            )
            : Array.isArray(charset) ?
              this.chars.push(...charset)
              : this.chars.push(charset);
        }
      );
    }

    includes(char: string): boolean {
      return this.chars.includes(char);
    }

    static get alphaNumeric(): Array<string> {
      return [
        ...this.numbers,
        ...this.alpha
      ];
    }

    static get alphaNumericLower(): Array<string> {
      return [
        ...this.numbers,
        ...this.alphaLower
      ];
    }

    static get alphaNumericUpper(): Array<string> {
      return [
        ...this.numbers,
        ...this.alphaUpper
      ];
    }

    static get numbers(): Array<string> {
      return [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
      ];
    }

    static get alpha(): Array<string> {
      return [
        ...this.alphaLower,
        ...this.alphaUpper
      ];
    }

    static get alphaLower(): Array<string> {
      return [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
      ];
    }

    static get alphaUpper(): Array<string> {
      return [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ];
    }

    static get dot(): string {
      return ".";
    }

    static get plus(): string {
      return "+";
    }

    static get hyphen(): string {
      return "-";
    }

    static get dollar(): string {
      return "$";
    }

    static get underscore(): string {
      return "_";
    }

    static get exclam(): string {
      return "!";
    }

    static get asterisk(): string {
      return "*";
    }

    static get quote(): string {
      return "'";
    }

    static get leftParen(): string {
      return "(";
    }

    static get rightParen(): string {
      return ")";
    }

    static get comma(): string {
      return ",";
    }

    static get leftBrace(): string {
      return "{";
    }

    static get rightBrace(): string {
      return "}";
    }

    static get or(): string {
      return "|";
    }

    static get backslash(): string {
      return "\\";
    }

    static get caret(): string {
      return "^";
    }

    static get tilde(): string {
      return "~";
    }

    static get leftBracket(): string {
      return "[";
    }

    static get rightBracket(): string {
      return "]";
    }

    static get backTick(): string {
      return "`";
    }

    static get lessThan(): string {
      return "<";
    }

    static get greaterThan(): string {
      return ">";
    }

    static get hash(): string {
      return "#";
    }

    static get percent(): string {
      return "%";
    }

    static get doubleQuote(): string {
      return "\"";
    }

    static get semicolon(): string {
      return ";";
    }

    static get slash(): string {
      return "/";
    }

    static get question(): string {
      return "?";
    }

    static get colon(): string {
      return ":";
    }

    static get at(): string {
      return "@";
    }

    static get and(): string {
      return "&";
    }

    static get equal(): string {
      return "=";
    }

    static get space(): string {
      return " ";
    }
  }

  export namespace CharSet {
    export type CharSetInput = CharSet
      | string[]
      | string;

    export class UrlCharSet extends CharSet {
      static get safe(): Array<string> {
        return [
          this.dollar,
          this.hyphen,
          this.underscore,
          this.dot,
          this.plus
        ];
      }

      static get extra(): Array<string> {
        return [
          this.exclam,
          this.asterisk,
          this.quote,
          this.leftParen,
          this.rightParen,
          this.comma
        ];
      }

      static get national(): Array<string> {
        return [
          this.leftBrace,
          this.rightBrace,
          this.or,
          this.backslash,
          this.caret,
          this.tilde,
          this.leftBracket,
          this.rightBracket,
          this.backTick
        ];
      }

      static get punctuation(): Array<string> {
        return [
          this.lessThan,
          this.greaterThan,
          this.hash,
          this.percent,
          this.doubleQuote
        ];
      }

      static get hex(): Array<string> {
        return [
          ...this.numbers,
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "a",
          "b",
          "c",
          "d",
          "e",
          "f"
        ];
      }

      static get unreserved(): Array<string> {
        return [
          ...this.alphaNumeric,
          ...this.safe,
          ...this.extra
        ];
      }
    }
  }

  export namespace Pattern {
    export abstract class RepeatedChar {
      readonly charset: CharSet;
      constructor(
        ...charsets: Array<RepeatedChar.RepeatedCharInput>
      ) {
        const chars: Array<string> = [];
        charsets.forEach(
          (charset) => {
            if (charset instanceof RepeatedChar)
              chars.push(...charset.charset.chars);
            else if (charset instanceof CharSet)
              chars.push(...charset.chars);
            else if (Array.isArray(charset))
              chars.push(...charset);
            else
              chars.push(charset);
          }
        );
        this.charset = new CharSet(chars);
      }

      abstract match(token: string): boolean;
    }

    export namespace RepeatedChar {
      export type RepeatedCharInput = RepeatedChar
        | CharSet.CharSetInput;

      export class MinMaxRepeatedChar extends RepeatedChar {
        readonly minReps: number;
        readonly maxReps: number;
        constructor(
          minReps: number,
          maxReps: number,
          ...charsets: Array<RepeatedCharInput>
        ) {
          super(...charsets);
          if (
            minReps < 0
            || maxReps < 0
            || Number.isNaN(minReps)
            || Number.isNaN(maxReps)
          )
            minReps = maxReps = 0;

          if (minReps > maxReps) {
            const tmp: number = minReps;
            minReps = maxReps;
            maxReps = tmp;
          }

          if (!Number.isFinite(minReps))
            this.minReps = this.maxReps = 0;
          else {
            this.minReps = minReps;
            this.maxReps = maxReps;
          }
        }

        match(token: string): boolean {
          return token.length >= this.minReps
            && token.length <= this.maxReps
            && [...token].every(
              (char: string) => (
                this.charset.includes(char)
              )
            );
        }
      }

      export namespace MinMaxRepeatedChar {
        export class NRepeatedChar extends MinMaxRepeatedChar {
          constructor(
            reps: number,
            ...charsets: Array<RepeatedCharInput>
          ) {
            super(reps, reps, ...charsets);
          }

          get reps() {
            return this.minReps;
          }
        }

        export namespace NRepeatedChar {
          export class OneRepeatedChar extends NRepeatedChar {
            constructor(
              ...charsets: Array<RepeatedCharInput>
            ) {
              super(1, ...charsets);
            }
          }
        }
      }
    }
  }

  export abstract class Gram {
    readonly word: string;
    constructor(
      word: string
    ) {
      this.word = word;
    }

    get length(): number {
      return this.word.length;
    }

    get string(): string {
      return this.word;
    }

    toString(): string {
      return this.string;
    }
  }

  export namespace Gram {
    export class NGram extends Gram {
      readonly n: number;
      readonly remainder: string;
      constructor(
        text: string,
        n: number = 1
      ) {
        n = Number.isNaN(n) ?
          1
          : Number.isFinite(n) ?
            n >= 1 ?
              Math.round(n)
              : 1
            : n !== -Infinity ?
              Infinity
              : 1;
        super(
          n === Infinity ?
            text
            : text.length >= n ?
              text.slice(0, n)
              : String()
        );
        this.n = n;
        this.remainder = text
          .slice(this.word.length);
      }

      get isToken(): boolean {
        return this.word.length > 0;
      }

      get valid(): boolean {
        return this.isToken;
      }

      get deterministic(): boolean {
        return Number.isFinite(this.n);
      }

      get hasRemainder(): boolean {
        return this.remainder.length > 0;
      }
    }

    export namespace NGram {
      export class OneGram extends NGram {
        constructor(
          text: string
        ) {
          super(text, 1);
        }
      }
    }
  }

  export abstract class StringValidator {
    readonly raw: string;
    readonly allowedChars: Array<Pattern.RepeatedChar.MinMaxRepeatedChar.NRepeatedChar.OneRepeatedChar>;
    readonly cleaned: string;
    constructor(
      text: string,
      {
        toLower = false,
        trim = true,
        trimLeading = [],
        trimTrailing = []
      }: {
        toLower?: boolean,
        trim?: boolean,
        trimLeading?: Array<string>,
        trimTrailing?: Array<string>
      },
      ...allowedChars: Array<StringValidator.StringValidatorInput>
    ) {
      this.raw = text;
      this.allowedChars = this
        .parseStringValidatorInput(...allowedChars);
      this.cleaned = this
        .clean(
          text,
          toLower,
          trim,
          trimLeading,
          trimTrailing
        );
    }

    private parseStringValidatorInput(
      ...allowedCharsInput: Array<StringValidator.StringValidatorInput>
    ): Array<Pattern.RepeatedChar.MinMaxRepeatedChar.NRepeatedChar.OneRepeatedChar> {
      const parsedPatterns: Array<Pattern.RepeatedChar.MinMaxRepeatedChar.NRepeatedChar.OneRepeatedChar> = [];
      allowedCharsInput.forEach(
        (input) => {
          if (input instanceof StringValidator)
            parsedPatterns.push(...input.allowedChars);
          else if (input instanceof Pattern.RepeatedChar.MinMaxRepeatedChar.NRepeatedChar.OneRepeatedChar)
            parsedPatterns.push(input);
          else
            parsedPatterns.push(new Pattern.RepeatedChar.MinMaxRepeatedChar.NRepeatedChar.OneRepeatedChar(input));
        }
      );
      return parsedPatterns;
    }

    private clean(
      text: string,
      toLower: boolean,
      trim: boolean,
      trimLeading: Array<string>,
      trimTrailing: Array<string>
    ): string {
      return postTrim(
        preTrim(
          trim ?
            toLower ?
              text.toLowerCase().trim()
              : text.trim()
            : toLower ?
              text.toLowerCase()
              : text,
          trimLeading
        ),
        trimTrailing
      );

      function preTrim(
        text: string,
        wordsToTrim: string[]
      ): string {
        wordsToTrim
          .filter(
            (word: string) => (
              word.length > 0
            )
          )
          .forEach(
            (word: string) => {
              while (text.startsWith(word))
                text = text.slice(
                  word.length
                );
            }
          );
        return text;
      }

      function postTrim(
        text: string,
        wordsToTrim: string[]
      ): string {
        wordsToTrim
          .filter(
            (word: string) => (
              word.length > 0
            )
          )
          .forEach(
            (word: string) => {
              while (text.endsWith(word))
                text = text.slice(
                  0,
                  0 - word.length
                );
            }
          );
        return text;
      }
    }

    get validated(): string {
      return this.isValid ?
        this.cleaned
        : String();
    }

    get isValid(): boolean {
      return this.oneGrams.every(
        (oneGram) => (
          this.allowedChars.some(
            (oneRepeatedChar) => (
              oneRepeatedChar.match(oneGram.word)
            )
          )
        )
      );
    }

    private get oneGrams(): Gram.NGram.OneGram[] {
      return splitStringIntoOneGrams(
        this.cleaned
      );

      function splitStringIntoOneGrams(
        text: string
      ): Gram.NGram.OneGram[] {
        return [...text]
          .map(
            (char) => (
              new Gram.NGram.OneGram(char)
            )
          );
      }
    }
  }

  export namespace StringValidator {
    export type StringValidatorInput = StringValidator
      | Pattern.RepeatedChar.MinMaxRepeatedChar.NRepeatedChar.OneRepeatedChar
      | CharSet.CharSetInput;

    export abstract class UrlValidator extends StringValidator { }
    export namespace UrlValidator {
      export class SchemeValidator extends UrlValidator {
        constructor(scheme: string) {
          super(
            scheme,
            {
              toLower: true,
              trimTrailing: [
                CharSet.UrlCharSet.slash,
                CharSet.UrlCharSet.colon
              ]
            },
            CharSet.UrlCharSet.alphaNumericLower,
            CharSet.UrlCharSet.plus,
            CharSet.UrlCharSet.dot,
            CharSet.UrlCharSet.hyphen
          );
        }
      }

      export class PortValidator extends UrlValidator {
        constructor(port: string) {
          super(
            port,
            {
              trimLeading: [
                CharSet.UrlCharSet.colon,
                CharSet.UrlCharSet.space
              ]
            },
            CharSet.UrlCharSet.numbers
          );
        }
      }

      export class FragmentValidator extends UrlValidator {
        constructor(fragment: string) {
          super(
            fragment,
            {
              trimLeading: [
                CharSet.UrlCharSet.hash,
                CharSet.UrlCharSet.space
              ]
            }
          );
        }
      }

    }
  }
}

abstract class _UrlPart {
  readonly part: string;
  constructor(
    part: _UrlPart
      | string = String()
  ) {
    this.part = part instanceof _UrlPart ?
      this.parse(part.string)
      : this.parse(part);
  }

  get string(): string {
    return this.part;
  }

  toString(): string {
    return this.string;
  }

  protected abstract parse(part: string): string;
}

namespace _UrlPart {
  export const UrlValidator = Validation.StringValidator.UrlValidator;

  export class Scheme extends _UrlPart {
    constructor(scheme?: string | Scheme) {
      super(scheme);
    }

    protected parse(scheme: string): string {
      return new UrlValidator.SchemeValidator(scheme)
        .validated;
    }
  }

  // WIP
  export class Host extends _UrlPart {
    constructor(
      host?: string | Host
    ) {
      super(host);
    }

    static get IP() {
      return importModule("host/IP");
    }
    static get IPv4() {
      return Host.IP.IPv4;
    }
    static get IPv6() {
      return Host.IP.IPv6;
    }
    static get RegName() {
      return importModule("host/RegName");
    }

    protected parse(host: any): string {
      return (this.parseIP(host) !== String()) ?
        this.parseIP(host)
        : (this.parseRegName(host) !== String()) ?
          this.parseRegName(host)
          : String();
    }

    protected parseIP(
      host: any
    ): string {
      return (this.parseIPv4(host) !== String()) ?
        this.parseIPv4(host)
        : (this.parseIPv6(host) !== String()) ?
          this.parseIPv6(host)
          : String();
    }

    protected parseIPv4(
      host: any
    ): string {
      return new Host.IPv4(host).string;
    }

    protected parseIPv6(
      host: any
    ): string {
      return new Host.IPv6(host).string;
    }

    protected parseRegName(
      host: any
    ): string {
      return new Host.RegName(host).string;
    }
  }

  // WIP
  export class Port extends _UrlPart {
    constructor(
      port?: string
        | number
        | Port
    ) {
      super(
        typeof port === "number" ?
          Number.isInteger(port) ?
            String(Math.trunc(port))
            : String()
          : port
      );
    }

    protected parse(
      port: string
    ): string {
      const parsedString: string = new PortValidator(port)
        .validated;
      const parsedInt: number = Number.isInteger(
        Number.parseInt(parsedString)
      ) ?
        Math.round(Number.parseInt(parsedString))
        : 0;
      return (
        parsedInt >= 1
        && parsedInt <= 65535
      ) ?
        String(Math.round(parsedInt)).trim()
        : String();
    }

    get number(): number {
      return (this.string === String()) ?
        0
        : Math.abs(Math.round(Number.parseInt(this.string)));
    }

    toNumber(
      coerceEmptyPortToNull: boolean = false
    ): null | number {
      const zeroValue: null | number = coerceEmptyPortToNull ?
        null
        : 0;
      return this.number === 0 ?
        zeroValue
        : this.number;
    }
  }

  // WIP
  export class Path extends _UrlPart {
    constructor(
      path?: (string
        | Path
        | undefined
      )
    ) {
      super(path);
    }

    protected static get PathSegment() {
      return importModule("path/PathSegment");
    }

    protected parse(path: string): string {
      return path;
    }

  }

  // WIP
  export class Query extends _UrlPart {
    readonly params: Array<typeof Query.QueryParam>;
    constructor(
      query?: (string
        | Query
        | undefined
      )
    ) {
      super(query);
      this.params = new Array<typeof Query.QueryParam>();
    }

    protected static get QueryParam() {
      return importModule("query/QueryParam");
    }

    protected parse(query: string): string {
      return query;
    }

    static fromObjectEntries() {

    }

    static fromQueryString() {

    }
  }

  // WIP
  export class Fragment extends _UrlPart {
    readonly encode: boolean;
    constructor(
      fragment?: string
        | Fragment,
      encode: boolean = true
    ) {
      super(fragment);
      this.encode = encode;
    }

    override get string(): string {
      return this.encode ?
        encodeURIComponent(super.string)
        : super.string;
    }

    protected parse(
      fragment: string
    ): string {
      return new FragmentValidator(fragment)
        .cleaned;
    }
  }
}

module.exports = _UrlPart;
