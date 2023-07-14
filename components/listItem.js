import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'

const ListItem = ({name, symbol, currentPrice, priceChangePercentage7d, logoUrl, onPress}) => {
  const priceChangeColor = priceChangePercentage7d > 0 ? '#34c759' : '#ff3b30'

  return (
   <TouchableOpacity onPress={onPress}>
      <View style={styles.itemWrapper}>
        <View style={styles.leftWrapper}>
          <Image source={{ uri: logoUrl }} style={styles.image} />
          <View style={styles.titlesWrapper}>
            <Text style={styles.title}> {name} </Text>
            <Text style={styles.subtitle}> {symbol.toUpperCase()} </Text>
          </View>
        </View>

        <View style={styles.rightWrapper}>
          <Text style={styles.title}> ${currentPrice.toLocaleString('en-US', { currency: 'USD' })} </Text>
          <Text style={[styles.subtitle, {color: priceChangeColor}]}> {priceChangePercentage7d.toFixed(2)}% </Text>
        </View>
      </View>
   </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    leftWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rightWrapper: {
      alignItems: 'flex-end'
    },
    title: {
      fontSize: 18,
    },
    subtitle: {
      fontSize: 14,
      color: '#a9abb1',
      marginTop: 4,
    },
    titlesWrapper: {
      marginLeft: 8,
    },
    itemWrapper: {
      paddingHorizontal: 16,
      marginTop: 24,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    image: {
      height: 48,
      width: 48,
    },
})

export default ListItem