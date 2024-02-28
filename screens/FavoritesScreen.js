import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopBar from '../components/TopBar';
import Loader from '../components/Loader';
import WallpaperPreview from '../components/WallpaperPreview';

const FavoritesScreen = () => {
    const [likedWallpapers, setLikedWallpapers] = useState([]);

    useEffect(() => {
        loadLikedWallpapers();
    },[])

    const loadLikedWallpapers = async () => {
        try{
            const likedWallpapersData = await AsyncStorage.getItem("likedWallpapers");
            if(likedWallpapersData){
                setLikedWallpapers(JSON.parse(likedWallpapersData));
            }
        }catch(error){
            console.log('Error fetching liked wallpapers: ', error);
        }
    }

    return (
            <View style={styles.screenContainer}>
                <TopBar/>
                <ScrollView contentContainerStyle={styles.scrollableContent}>
                    <View style={{width: '100%', alignItems: 'left', paddingLeft: 20}}>
                        <Text style={{color: '#AAAFB0', fontSize: 22, fontWeight: 600}}>Favorites</Text>
                    </View>
                    {
                        likedWallpapers.length === 0 ? 
                            <View style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: '#AAAFB0', fontSize: 20}}>No liked wallpapers yet</Text>
                            </View>
                        :

                        likedWallpapers.map((wallpaper, index) => (
                            <WallpaperPreview category={'favorites'} imageSource={wallpaper.src} wallpapers={likedWallpapers} setLikedWallpapers={setLikedWallpapers} key={index}/>
                        ))
                    }
                </ScrollView>
            </View>    
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#121212',

    },
    scrollableContent: {
        width: '100%',
        alignItems: 'center',
        gap: 10,
    }

})

export default FavoritesScreen;