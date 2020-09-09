import { TextStyle } from "react-native";
import { blackish } from "./colors";

const title: TextStyle = {
  fontSize: 24,
  fontWeight: "bold",
  color: blackish,
  letterSpacing: 0.5,
};

const tabBar: TextStyle = {
  fontFamily: "sans-serif",
  fontSize: 20,
  fontWeight: "400",
  letterSpacing: 2,
};

const buttonText: TextStyle = {
  fontFamily: "sans-serif",
  fontSize: 22,
  fontWeight: "600",
  letterSpacing: 1,
};

const condensedText: TextStyle = {
  fontFamily: "sans-serif-condensed",
  letterSpacing: 0.6,
  fontSize: 18,
  color: blackish,
};

const text2: TextStyle = {
  fontSize: 18,
  fontWeight: "400",
  letterSpacing: 1,
};

export { title, tabBar, buttonText, condensedText, text2 };
