import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React, {useEffect, useState} from 'react'
import {ChartDot, ChartPath, ChartPathProvider, ChartYLabel} from '@rainbow-me/animated-charts'
import { useSharedValue } from 'react-native-reanimated'


export const { width: SIZE } = Dimensions.get('window')

const Chart = ({currentPrice, logoUrl, name, priceChangePercentage7d, sparkline, symbol}) => {
  const latestCurrentPrice = useSharedValue(currentPrice)
  const [chartReady, setChartReady] = useState(false)

  const priceChangeColor = priceChangePercentage7d > 0 ? '#34c759' : '#ff3b30'

  useEffect(() => {
    latestCurrentPrice.value = currentPrice

    setTimeout(() => {
      setChartReady(true)
    }, 0)

  }, [currentPrice])

  const formatUSD = value => {
    'worklet';
    if (value === '') {
      const formattedValue = `$${latestCurrentPrice.value.toLocaleString('en-US', { currency: 'USD' })}`
      return formattedValue;
    }}

  return (
    <ChartPathProvider data={{ points: sparkline, smoothingStrategy: 'bezier' }}>
    <View style={StyleSheet.chartWrapper}>
      
       <View style={styles.titlesWrapper}>

          <View style={styles.upperTitles}>
             
             <View style={styles.upperLeftTitle}>
                <Image source={{ uri: logoUrl }} style={styles.image} />
                <Text style={styles.subtitle}>{name} ({symbol.toUpperCase()})</Text>
             </View>
                <Text style={styles.subtitle}>7D</Text>
          </View>

          <View style={styles.lowerTitles}>
             <ChartYLabel
               format={formatUSD}
               style={styles.boldTitle}
             />
             <Text style={styles.boldTitle}> ${currentPrice.toLocaleString('en-US', { currency: 'USD' })} </Text>
             <Text style={[styles.title, {color: priceChangeColor}]}> {priceChangePercentage7d.toFixed(2)}% </Text>
          </View>

       </View>
  { chartReady ?     
    (<View style={styles.chartLineWrapper}>
      <ChartPath height={SIZE / 2} stroke='black' width={SIZE} />
      <ChartDot style={{ backgroundColor: 'black' }} />
    </View>)
  : null}
    </View>
    </ChartPathProvider>
  )
}

const styles = StyleSheet.create({
   chartWrapper: {
     marginVertical: 16,

   },
   titlesWrapper: {
     marginHorizontal: 16,
   },
   upperTitles: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
   },
   upperLeftTitle: {
     flexDirection: 'row',
     alignItems: 'center',

   },
   subtitle: {
    fontSize: 14,
    color: '#a9abb1',
   },
   lowerTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
   },
   boldTitle: {
    fontSize: 24,
    fontWeight: 'bold',

   },
   title: {
    fontSize: 18,
   },
   image: {
    width: 24,
    height: 24,
    marginRight: 4,
   },
   chartLineWrapper: {
    marginTop: 40,
   },
})

export default Chart