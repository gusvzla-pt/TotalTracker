import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  textSymbol: {
    color: "white",
    fontWeight: 'bold',
    marginHorizontal: 5,
    fontSize: 17
  },
  rankContainer: {
    color: "white",
    fontWeight: 'bold',
    fontSize: 15,
    backgroundColor: '#585858',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  image: {
    width: 25,
    height: 25,
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  centerHeaderBar: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default styles;
