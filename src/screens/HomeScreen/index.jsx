import React, { useEffect, useState } from "react";
import { VirtualizedList, RefreshControl, Text, View } from "react-native";
import CoinItem from "../../components/CoinItem";
import { getMarketData } from "../../services/requests";
import styles from "./styles";

const HomeScreen = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async (pageNumber) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData(pageNumber);
    setCoins((existingCoins) => [...existingCoins, ...coinsData]);
    setLoading(false);
  };

  const refetchCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData();
    setCoins(coinsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => <CoinItem marketCoin={item} />;

  const getItemCount = () => coins.length;

  const getItem = (data, index) => data[index];

  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.title}>Crypto Market</Text>
        <Text style={{color: 'white', paddingHorizontal: 10}}>Logo de inicio sesion</Text>
      </View>
      <VirtualizedList
        data={coins}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={() => fetchCoins(coins.length / 50 + 1)}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor="white"
            onRefresh={refetchCoins}
          />
        }
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </View>
  );
};

export default HomeScreen;
