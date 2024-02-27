import React, { useEffect, useRef } from 'react'
import { StyleSheet, View, ColorValue, Animated, Easing } from 'react-native'

const startRotationAnimation = (durationMs, rotationDegrees) => {
    Animated.loop(Animated.timing(
        rotationDegrees,
        {
            toValue: 360,
            duration: durationMs,
            easing: Easing.linear,
            useNativeDriver: true
        }
    )).start()
}

const Loader = (props) => {
    const color = '#1d9ed5d5';
    const rotationDegrees = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        rotationDegrees.setValue(0)
        startRotationAnimation(1000, rotationDegrees)
    }, [rotationDegrees])

  return (
    <View style={styles.container} accessibilityRole='progressbar'>
        <View style={[styles.background, { borderColor: color }]} />
        <Animated.View
            style={[styles.progress, { borderTopColor: color,
                transform: [{
                    rotateZ: rotationDegrees.interpolate({
                        inputRange: [0, 360],
                        outputRange: ['0deg', '360deg']
                    }),
                }]
             }]} 
        />  
    </View>
)}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '45%',
    left: '45%',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  background: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    borderWidth: 4,
    opacity: 0.25
  },
  progress: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderWidth: 4,
    position: 'absolute'
  }
})

export default Loader;