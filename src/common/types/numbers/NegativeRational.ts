const nr_Integer: typeof Integer = importModule("integer/Integer");

class NegativeRational extends nr_Integer.Rational {
  override cardinality: Cardinality =
    new NegativeRational.Cardinality.Negative();

  static get Integer(): typeof Integer {
    try {
      return nr_Integer;
    } catch (e) {
      throw new ReferenceError(
        `NegativeRational: error loading parent Integer module: ${e}`,
      );
    }
  }

  static get Rational(): typeof Rational {
    try {
      return NegativeRational.Integer.Rational;
    } catch (e) {
      throw new ReferenceError(
        `NegativeRational: error loading Integer.Rational module: ${e}`,
      );
    }
  }
}

module.exports = NegativeRational;
