import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import React, { useState, useRef, useMemo, useEffect } from 'react'
import ListItem from './components/listItem';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Chart from './components/Chart';
import { getMarketData } from './services/cryptoService';


const ListHeader = () => (
  <>
  <View style={styles.titleWrapper}>
    <Text style={styles.largeTitle}>
       Markets
    </Text>
  </View>
  <View style={styles.divider} />
  </> 
)

export default function App() {
  const [data, setData] = useState([])
  const [selectedCoinData, setSelectedCoinData] = useState(null)

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData()
      setData(marketData)
    }

    fetchMarketData()
  }, [])

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['50%'], []);

  const openModal = (item) => {
    setSelectedCoinData(item)
    bottomSheetModalRef.current?.present()
  }

  return (
  <BottomSheetModalProvider>
    <SafeAreaView style={styles.container}>
        <FlatList
           keyExtractor={(item) => item.id}
           data={data}
           renderItem={({ item }) => (
              <ListItem
                name={item.name}
                symbol={item.symbol}
                currentPrice={item.current_price}
                priceChangePercentage7d={item.price_change_percentage_7d_in_currency}
                logoUrl={item.image}
                onPress={() => openModal(item)}
              />
           )}
           ListHeaderComponent={<ListHeader />}
        />
    </SafeAreaView>

    <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheet}
      >
      {selectedCoinData ? (
      <Chart 
        currentPrice={selectedCoinData.current_price}
        logoUrl={selectedCoinData.image}
        name={selectedCoinData.name}
        priceChangePercentage7d={selectedCoinData.price_change_percentage_7d_in_currency}
        sparkline={selectedCoinData.sparkline_in_7d.price}
        symbol={selectedCoinData.symbol}
      />
      )
      : null }
    </BottomSheetModal>
  </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleWrapper: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#000000',
    marginTop: 16,
    marginHorizontal: 16,
  },
  bottomSheet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
