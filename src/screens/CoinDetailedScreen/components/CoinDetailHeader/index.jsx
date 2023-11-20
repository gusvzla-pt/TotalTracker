import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { getDetailedCoinData } from "../../../../services/requests";
import {
  useWatchlist,
  storeWatchlistCoinId,
  removeWatchlistCoinId,
} from "../../../../Context/WatchlistContext";

const CoinDetailHeader = () => {
  const navigation = useNavigation();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const {
    params: { coinId },
  } = route;
  const { watchlistCoinIds, storeWatchlistCoinId, removeWatchlistCoinId } =
    useWatchlist();

  const fetchCoinData = async () => {
    setLoading(true);
    const fetchedCoinData = await getDetailedCoinData(coinId);
    setCoin(fetchedCoinData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoinData();
  }, []);

  if (loading || !coin) {
    return <Text style={{ color: "white" }}>Loading...</Text>;
  }

  const {
    id,
    image: { small },
    symbol,
    name,
    market_data: { market_cap_rank },
  } = coin;

  const checkIfCoinIsWatchListed = () =>
    watchlistCoinIds.some((coinIdValue) => coinIdValue === id);

  const handleWatchlistCoin = (id) => {
    if (checkIfCoinIsWatchListed()) {
      return removeWatchlistCoinId(id);
    }
    return storeWatchlistCoinId(id);
  };

  return (
    <View style={styles.headerBar}>
      <Ionicons
        name="chevron-back-sharp"
        size={30}
        color="white"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.centerHeaderBar}>
        <Image source={{ uri: small }} style={styles.image} />
        <Text style={styles.textSymbol}>{symbol.toUpperCase()}</Text>
        <Text style={styles.rankContainer}>#{market_cap_rank}</Text>
      </View>
      <FontAwesome
        name={checkIfCoinIsWatchListed() ? "star" : "star-o"}
        size={25}
        color={checkIfCoinIsWatchListed() ? "#FFBF00" : "white"}
        onPress={() => {
          handleWatchlistCoin(id);
        }}
      />
    </View>
  );
};

export default CoinDetailHeader;
