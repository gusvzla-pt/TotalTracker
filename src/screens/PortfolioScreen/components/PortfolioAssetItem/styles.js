import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 30,
    marginRight: 10,
    alignSelf: 'center'
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-end'
  },
  ticker: {
    color: 'grey',
    fontWeight: '700',
  },
  coinContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#121212'
  },
  quantityContainer: {
    marginLeft: 'auto',
    alignItems: 'flex-end'
  }
});

export default styles;
