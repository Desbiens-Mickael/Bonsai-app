import { View, ActivityIndicator, StyleSheet } from "react-native";

export default function Loader() {
  return (
    <View style={styles.containerLoader}>
      <ActivityIndicator size="large" color="#7100FE" />
    </View>
  );
}

const styles = StyleSheet.create({
  containerLoader: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
