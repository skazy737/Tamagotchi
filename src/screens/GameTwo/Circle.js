//src/screens/GameTwo/Circle.js
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('window');

const BODY_DIAMETER = Math.trunc(Math.max(width, height) * 0.05);
const BORDER_WIDTH = Math.trunc(BODY_DIAMETER * 0.1);

const Circle = ({ body }) => {
  const { position } = body;

  if (!position) {
    return null;
  }

  const x = position.x - BODY_DIAMETER / 2;
  const y = position.y - BODY_DIAMETER / 2;

  return (
    <View
      style={[
        styles.circle,
        { left: x, top: y, width: BODY_DIAMETER, height: BODY_DIAMETER }
      ]}
    />
  );
};

const styles = StyleSheet.create({
  circle: {
    backgroundColor: "#FF5877",
    borderColor: "#FFC1C1",
    borderWidth: BORDER_WIDTH,
    position: "absolute",
    borderRadius: BODY_DIAMETER / 2,
    borderStyle: "solid"
  }
});

export default Circle;
