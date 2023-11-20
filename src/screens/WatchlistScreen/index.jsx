import React, { useState, useEffect } from "react";
import { View, Text, VirtualizedList, RefreshControl } from "react-native";
import { useWatchlist } from "../../Context/WatchlistContext";
import CoinItem from "../../components/CoinItem";
import { getWatchlistedCoins } from "../../services/requests";

const WatchlistScreen = () => {
  const { watchlistCoinIds } = useWatchlist();

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const transformCoinIds = () => watchlistCoinIds.join("%2C");

  const fetchWatchlistedCoins = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    const watchlistedCoinsData = await getWatchlistedCoins(1, transformCoinIds());
    setCoins(watchlistedCoinsData);
    setLoading(false);
  };

  useEffect(() => {
    if (watchlistCoinIds.length > 0) {
      fetchWatchlistedCoins();
    }
  }, [watchlistCoinIds]);

  const getItemCount = () => coins.length;

  const getItem = (data, index) => data[index];

  return (
    <VirtualizedList
      data={coins}
      renderItem={({ item }) => <CoinItem marketCoin={item} />}
      keyExtractor={(item) => item.id.toString()}
      getItemCount={getItemCount}
      getItem={getItem}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          tintColor="white"
          onRefresh={watchlistCoinIds.length > 0 ? fetchWatchlistedCoins : null}
        />
      }
    />
  );
};

export default WatchlistScreen;

