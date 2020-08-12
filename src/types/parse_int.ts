import SumType from "sums-up";

/**
 * `parseInt` API
 * Since `NaN` is a number, we cannot fully rely on this return type.
 * Additionally, we can add more specific states for the input,
 * to provide more tailored error messages
 */
class ParseInt extends SumType<{
  EmptyString: [];
  NaN: [];
  Parsed: [number];
}> {
  /**
   * Provide a fallback number for all other cases
   */
  public orElse(fallback: number): number {
    return this.caseOf({
      Parsed: n => n,
      _: () => fallback,
    });
  }
}

function EmptyString(): ParseInt {
  return new ParseInt("EmptyString");
}

function NaN(): ParseInt {
  return new ParseInt("NaN");
}

function Parsed(num: number): ParseInt {
  return new ParseInt("Parsed", num);
}

function parse(str: string): ParseInt {
  if (str === "") {
    return EmptyString();
  } else {
    const parsed = parseInt(str);
    return isNaN(parsed) ? NaN() : Parsed(parsed);
  }
}

export { ParseInt, EmptyString, NaN, Parsed, parse };
