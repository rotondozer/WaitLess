import "react-native-get-random-values"; // needs to be above uuid import
import { v4 as uuid } from "uuid";
import { Maybe, Just } from "seidr";
import {
  ActiveUser,
  ParseInt,
  Party as Party_,
  Time,
  CreatePartyInput,
} from "types";

export type Party = Party_;

export function createInput(
  name: string,
  guestCount: number,
  estWait: Time.Time,
): CreatePartyInput {
  return {
    id: uuid(),
    name,
    guestCount,
    waitingSince: new Date().toISOString(),
    estWait: Time.format(estWait),
    isWaiting: true,
  };
}
