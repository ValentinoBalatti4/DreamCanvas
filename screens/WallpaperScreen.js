import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Touchable, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const WallpaperScreen = (props) => {
    const { category, wallpaperSource } = props.route.params;
    const navigation = useNavigation();

    const handleGoBack = (category) => {
        navigation.navigate('wallpaperGrid', {category})
    }

    return(
        <View style={StyleSheet.wallpaperScreenContainer}>
            <Image source={{ uri: wallpaperSource }} style={styles.wallpaperScreenBackground}/>
            <View style={styles.topSection}>
                <TouchableOpacity style={styles.iconContainer} onPress={() => handleGoBack(category)}>
                    <Icon name='arrow-back' color={'#000'} size={30} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                    <Icon name='favorite' size={30} color={'#000'}/>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomSection}>
                <View style={styles.wallpaperOptions}>
                    <TouchableOpacity style={[styles.optionsButton, {backgroundColor: '#aaafb09a'}]}>
                        <Text style={styles.optionsText}>Set as wallpaper</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.optionsButton, {backgroundColor: '#1d9ed5d5'}]}>
                        <Text style={styles.optionsText}>Download</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal={true} contentContainerStyle={styles.bottomSimilarScroll}>
                    <View style={{width: 80, height: 80, backgroundColor: 'red'}}></View>
                    <View style={{width: 80, height: 80, backgroundColor: 'red'}}></View>
                    <View style={{width: 80, height: 80, backgroundColor: 'red'}}></View>
                    <View style={{width: 80, height: 80, backgroundColor: 'red'}}></View>
                    <View style={{width: 80, height: 80, backgroundColor: 'red'}}></View>
                    <View style={{width: 80, height: 80, backgroundColor: 'red'}}></View>
                    <View style={{width: 80, height: 80, backgroundColor: 'red'}}></View>
                    <View style={{width: 80, height: 80, backgroundColor: 'red'}}></View>
                    <View style={{width: 80, height: 80, backgroundColor: 'red'}}></View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wallpaperScreenContainer: {
        width: '100%',
        height: '100%',
    },

    wallpaperScreenBackground: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    topSection: {
        width: '100%',
        position: 'absolute',
        top: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    iconContainer:{
     backgroundColor: '#aaafb088', 
     borderRadius: '50%', 
     alignItems: 'center', 
     justifyContent: 'center',
     padding: 5,
    },
    bottomSection: {
        width: '100%',
        height: 300,
        position: 'absolute',
        bottom: 0,


    },
    wallpaperOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: 20
    },
    optionsText: {
        fontSize: 18,
        fontWeight: '800',
        color: '#dadada'
    },
    optionsButton: {
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius: '50%'
    },
    bottomSimilarScroll: {
        flexDirection: 'row',
        gap: 15
    }
})


export default WallpaperScreen;