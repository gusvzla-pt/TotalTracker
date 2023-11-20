import React from "react";
import { View, Text } from "react-native";
import CoinDetailHeader from "./components/CoinDetailHeader";
import CoinDetailContent from "./components/CoinDetailContent";


const CoinDetailedScreen = () => {
  

  return (
    <View style={{ paddingHorizontal: 10 }}>
      
       
          <CoinDetailHeader />
          <CoinDetailContent />

     
    </View>
  );
};

export default CoinDetailedScreen;
