import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Touchable, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const WallpaperScreen = (props) => {
    const { category, wallpaperSource, wallpapers } = props.route.params;
    const navigation = useNavigation();

    const [bottomSectionOpacity, setBottomSectionOpacity] = useState(1);

    const handleGoBack = (category) => {
        navigation.navigate('wallpaperGrid', {category})
    }

    const hideBottomSection = () => {
        setBottomSectionOpacity(prevOpacity => prevOpacity === 1 ? 0.0 : 1);
    }

    const selectImage = (wallpaperSource) => {
        navigation.navigate('wallpaperVisualizer', {category, wallpaperSource, wallpapers})
    }

    const handleDownloadButton = () => {

    }

    const handleSetAsWallpaperButton = () => {
        
    }

    return(
        <View style={styles.wallpaperScreenContainer}>
        <TouchableOpacity activeOpacity={0.9} onPress={hideBottomSection}>
            <Image source={{ uri: wallpaperSource }} style={styles.wallpaperScreenBackground} />
        </TouchableOpacity>
            <View style={styles.topSection}>
                <TouchableOpacity style={styles.iconContainer} onPress={() => handleGoBack(category)}>
                    <Icon name='arrow-back' color={'#000'} size={30} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                    <Icon name='favorite' size={30} color={'#000'}/>
                </TouchableOpacity>
            </View>
            <View style={[styles.bottomSection, {opacity: bottomSectionOpacity}]}>
                <View style={styles.wallpaperOptions}>
                    <TouchableOpacity style={[styles.optionsButton, {backgroundColor: '#aaafb09a'}]}>
                        <Text style={styles.optionsText}>Set as wallpaper</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.optionsButton, {backgroundColor: '#1d9ed5d5'}]}>
                        <Text style={styles.optionsText}>Download</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal={true} contentContainerStyle={styles.bottomSimilarScroll}>
                {
                    wallpapers.map((wallpaper, index) => (
                        <TouchableOpacity activeOpacity={0.5} style={{width: 100, height: 200}} onPress={() => selectImage(wallpaper.src.portrait)} key={index}>
                            <Image source={{ uri: wallpaper.src.portrait}} style={{width: '100%', height: '100%', borderRadius: 10}}/>
                        </TouchableOpacity>   

                    ))
                }
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
        marginTop: 20,
        flexDirection: 'row',
        gap: 15
    }
})


export default WallpaperScreen;