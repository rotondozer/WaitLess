import { Result, Err, Ok } from "seidr";

enum ParseError {
  EMPTY_STRING,
  NaN,
}

function stringToNum(input: string): Result<ParseError, number> {
  if (input === "") {
    return Err(ParseError.EMPTY_STRING);
  } else {
    const parsed = parseInt(input);
    return isNaN(parsed) ? Err(ParseError.NaN) : Ok(parsed);
  }
}

export { stringToNum, ParseError };
