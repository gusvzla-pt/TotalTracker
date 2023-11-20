import React, {memo} from "react";
import { Pressable, Text } from "react-native";
import styles from "./styles";

const FilterComponent = (props) => {
  const { filterDay, filterText, selectedRange, setSelectedRange } = props;
  const isFilterSelected = (filter) => filter === selectedRange;
  return (
    <Pressable>
      <Text
        style={{
          ...styles.filterChartText,
          backgroundColor: isFilterSelected(filterDay)
            ? "#1e1e1e"
            : "transparent",
          color: isFilterSelected(filterDay) ? "white" : "grey",
        }}
        onPress={() => setSelectedRange(filterDay)}
      >
        {filterText}
      </Text>
    </Pressable>
  );
};

export default memo(FilterComponent);
