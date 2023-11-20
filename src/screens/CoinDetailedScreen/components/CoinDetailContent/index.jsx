import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import {
  VictoryLine,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
} from "victory-native";
import { useRoute } from "@react-navigation/native";
import {
  getDetailedCoinData,
  getPricesForChart,
} from "../../../../services/requests";
import FilterComponent from "../FilterComponents";

const size = Dimensions.get("window").width;

const filterDayArray = [
  { filterDay: "1", filterText: "24h" },
  { filterDay: "7", filterText: "7d" },
  { filterDay: "30", filterText: "30d" },
  { filterDay: "365", filterText: "1y" },
  { filterDay: "max", filterText: "All" },
];

const CoinDetailContent = (props) => {
  const [data, setData] = useState(null);
  const [coin, setCoin] = useState(null);
  const [period, setPeriod] = useState(30);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const {
    params: { coinId },
  } = route;
  const [coinValue, setCoinValue] = useState("1");
  const [usdValue, setUsdValue] = useState("");
  const [selectedRange, setSelectedRange] = useState("1");

  const fetchCoinData = async () => {
    setLoading(true);

    try {
      const fetchedCoinData = await getDetailedCoinData(coinId);

      if (fetchedCoinData) {
        setCoin(fetchedCoinData);

        if (
          fetchedCoinData.market_data &&
          fetchedCoinData.market_data.current_price
        ) {
          setUsdValue(fetchedCoinData.market_data.current_price.usd.toString());
        }
      }
    } catch (error) {
      console.error("Error fetching coin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMarketCoinData = async (selectedRangeValue) => {
    const fetchedPricesDataForChart = await getPricesForChart(
      coinId,
      selectedRangeValue
    );

    if (fetchedPricesDataForChart) {
      setData(fetchedPricesDataForChart);
    }
  };

  useEffect(() => {
    fetchCoinData();
    fetchMarketCoinData(1);
  }, []);

  if (loading || !coin) {
    return <ActivityIndicator size="large" />;
  }

  const {
    symbol,
    name,
    market_cap_rank,
    market_data: { current_price, price_change_percentage_24h },
    id,
  } = coin;

  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";

  const changeCoinValue = (value) => {
    setCoinValue(value);
    const floatValue = parseFloat(value.replace(",", ".")) || 0;
    setUsdValue((floatValue * current_price.usd).toFixed(2).toString());
  };
  const changeUsdValue = (value) => {
    setUsdValue(value);
    const floatValue = parseFloat(value.replace(",", ".")) || 0;
    setCoinValue((floatValue / current_price.usd).toFixed(8).toString());
  };

  const onSelectedRangeChange = (selectedRangeValue) => {
    setSelectedRange(selectedRangeValue);
    fetchMarketCoinData(selectedRangeValue);
  };

  return (
    <View>
      <View style={styles.priceContainer}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.currentPrice}>${current_price.usd}</Text>
        </View>
        <View
          style={{
            fontSize: 17,
            fontWeight: "500",
            backgroundColor: percentageColor,
            padding: 7,
            borderRadius: 5,
            flexDirection: "row",
          }}
        >
          <AntDesign
            name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
            size={12}
            color={"white"}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text style={{ color: "white" }}>
            {price_change_percentage_24h?.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View style={styles.filterChartContainer}>
        {filterDayArray.map((day) => (
          <FilterComponent
            filterDay={day.filterDay}
            filterText={day.filterText}
            selectedRange={selectedRange}
            setSelectedRange={onSelectedRangeChange}
          />
        ))}
      </View>
      <VictoryLine
        style={{
          data: {
            stroke: percentageColor,
            strokeWidth: 2,
          },
        }}
        width={size}
        height={size / 2}
        data={data}
      />
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Text style={styles.convertRow}>{symbol.toUpperCase()}</Text>
          <TextInput
            style={styles.input}
            value={coinValue.toString()}
            keyboardType="numeric"
            onChangeText={changeCoinValue}
            maxLength={10}
          />
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Text style={styles.convertRow}>USD</Text>
          <TextInput
            style={styles.input}
            value={usdValue.toString()}
            keyboardType="numeric"
            onChangeText={changeUsdValue}
          />
        </View>
      </View>
    </View>
  );
};

export default CoinDetailContent;
