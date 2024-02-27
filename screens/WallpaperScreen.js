import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LinearGradient} from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const WallpaperScreen = (props) => {
    const { category, wallpaperSource, wallpapers } = props.route.params;
    const navigation = useNavigation();

    const [liked, setIsLiked] = useState(false);
    const [bottomSectionVisibility, setBottomSectionVisibility] = useState(1);

    const handleGoBack = (category) => {
        if(category === 'favorites'){
            navigation.navigate("favoritesScreen");
        }else{
            navigation.navigate('wallpaperGrid', {category})
        }
    }

    useEffect(() => {
        checkLikedStatus();
    }, [wallpaperSource])

    const checkLikedStatus = async () => {
        try {
            const likedWallpapers = await AsyncStorage.getItem('likedWallpapers');

            if (likedWallpapers) {
                const parsedLikedWallpapers = JSON.parse(likedWallpapers);
                const isLiked = parsedLikedWallpapers.some((wallpaper) => wallpaper.src === wallpaperSource);   
                setIsLiked(isLiked);
            }
        } catch (error) {
            console.error('Error checking liked status:', error);
        }
    };

    const handleLikeButton = async () => {
        try{
            const likedWallpapers = await AsyncStorage.getItem('likedWallpapers');
            let updatedLikedWallpapers = [];

            if(likedWallpapers){
                updatedLikedWallpapers = JSON.parse(likedWallpapers);

                if(liked){
                    updatedLikedWallpapers = updatedLikedWallpapers.filter((wallpaper) => wallpaper.src !== wallpaperSource);
                }else{
                    updatedLikedWallpapers.push({ src: wallpaperSource });
                }
            }else{
                updatedLikedWallpapers.push({ src: wallpaperSource });
            }
        
            await AsyncStorage.setItem('likedWallpapers', JSON.stringify(updatedLikedWallpapers));
            setIsLiked(!liked);
        }catch(error){
            console.log('Error handling like button: ', error)
        }
    }

    const hideBottomSection = () => {
        setBottomSectionVisibility(!bottomSectionVisibility);
    }

    const selectImage = (wallpaperSource) => {
        navigation.navigate('wallpaperVisualizer', {category, wallpaperSource, wallpapers})
    }

    const handleDownloadButton = () => {

    }

    const handleSetAsWallpaperButton = () => {

    }
    console.log(wallpaperSource)
    return(
        <View style={styles.wallpaperScreenContainer}>
        <TouchableOpacity activeOpacity={0.9} onPress={hideBottomSection}>
            <Image source={{ uri: wallpaperSource.portrait }} style={styles.wallpaperScreenBackground} />
        </TouchableOpacity>
            <View style={styles.topSection}>
                <TouchableOpacity style={styles.iconContainer} onPress={() => handleGoBack(category)}>
                    <Icon name='arrow-back' color={'white'} size={30} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={() => handleLikeButton()}>
                    <Icon name='favorite' size={30} color={liked ? 'black' : 'white'}/>
                </TouchableOpacity>
            </View>
            <View style={[styles.bottomSection, {display: bottomSectionVisibility ? 'flex' : 'none'}]}>
                <LinearGradient
                    colors={['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0.6)']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={styles.bottomSectionGradient}
                >
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
                            <TouchableOpacity activeOpacity={0.5} style={{width: 100, height: 200}} onPress={() => selectImage(wallpaper.src)} key={index}>
                                <Image source={{ uri: wallpaper.src.portrait}} style={{width: '100%', height: '100%', borderRadius: 10}}/>
                            </TouchableOpacity>   

                        ))
                    }
                    </ScrollView>
                </LinearGradient>
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
        paddingHorizontal: 20
    },
    iconContainer:{
     backgroundColor: '#aaafb088', 
     borderRadius: '50%', 
     alignItems: 'center', 
     justifyContent: 'center',
     padding: 7,
     opacity: 0.7,
     shadowColor: '#000',
     shadowOffset: {
       width: 1,
       height: 3,
     },
     shadowOpacity: 0.5,
     shadowRadius: 3.5,
 
    },
    bottomSection: {
        width: '100%',
        height: 300,
        position: 'absolute',
        bottom: 0,
    },
    bottomSectionGradient: {flex: 1,
        borderRadius: 10,
        paddingTop: 10
    },
    wallpaperOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
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
        borderRadius: '50%',
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 3,
        },
        shadowOpacity: 0.8,
        shadowRadius: 3.5,
    },
    bottomSimilarScroll: {
        marginTop: 20,
        flexDirection: 'row',
        gap: 15
    }
})


export default WallpaperScreen;