import * as ParseInt from "./parse_int";

/**
 * HH:MM style timer
 */
export type Time = [number, number, number, number];

export function reset(): Time {
  return [0, 0, 0, 0];
}

/**
 * [0, 2, 4, 3] -> "02:43"
 */
export function format(time: Time): string {
  return `${time[0]}${time[1]}:${time[2]}${time[3]}`;
}

/**
 * "243" -> [0, 2, 4, 3]
 * @param numString e.g. onChangeText callback prop
 */
export function fromNumericalString(numString: string): Time {
  return numString
    .split("")
    .map(ParseInt.parse)
    .reduce(
      (time, num) =>
        num.caseOf({
          Parsed: n => addToTime(n, time),
          _: () => time,
        }),
      reset(),
    );
}

/**
 * 3 -> [0, 0, 2, 4] -> [0, 2, 4, 3]
 */
export function addToTime(num: number, time: Time): Time {
  time.shift();
  time.push(num);
  return time;
}
