import { View, Text, StyleSheet, ScrollView, Image, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';

import { createClient } from 'pexels';
import WallpaperPreview from '../components/WallpaperPreview';
import Loader from '../components/Loader';

const WallpaperGrid = (props) => {
    const { category, categoryImg } = props.route.params;
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);    
    const [wallpapers, setWallpapers] = useState([]);
    const [isLoading ,setIsLoading] = useState(false);
    
    const pexelsClient = createClient('FL2dxlrKiFxD7bUixuYfDzuEtCfsW9hPXfg748zfKGO79bZ12f2m1PpH');
    const fetchImages = async (category, page = 1, perPage = 20) => {
        try {
          const response = await pexelsClient.photos.search({
            query: category,
            page,
            per_page: perPage,
          });
      
          return response.photos;
        } catch (error) {
          console.error('Error fetching images:', error);
          // Handle errors appropriately
        }
    };
    
    useEffect(() => {
        const fetchInitialImages = async () => {
          setIsLoading(true);
          try {
            const fetchedImages = await fetchImages(category);
            setWallpapers(fetchedImages);
          } catch (error) {
            console.error('Error fetching initial images:', error);
          } finally {
            setIsLoading(false);
          }
        };
      
        fetchInitialImages();
      }, [category]);

    const toggleSidebar = () => {
        setSidebarIsOpen(!sidebarIsOpen);
    }

    return (
        <View style={styles.wallpaperGridPage}>
            <TopBar toggleSidebar={toggleSidebar}/>
            { sidebarIsOpen && <SideBar toggleSidebar={toggleSidebar}/> }
            <ScrollView contentContainerStyle={styles.wallpapersGridContainer}>
                <View style={styles.titleContainer}>
                    <Image source={{ uri: categoryImg }} style={{width: '100%', height: '100%', borderRadius: 15, resizeMode: 'stretch', opacity: 0.6}}/>
                    <Text style={{color: '#dadada',fontSize: 26, fontWeight: 700 , position: 'absolute', letterSpacing: 2}}>{category}</Text>
                </View>
                {
                    isLoading ? <Loader/> : (
                        wallpapers.map((wallpaper, index) => (
                            <WallpaperPreview category={category} imageSource={wallpaper.src.large} key={index}/>
                        ))
                    )

                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    wallpaperGridPage: {
        flex: 1,
        backgroundColor: '#121212',

    },
    wallpapersGridContainer: {
        backgroundColor: '#121212',
        width: '100%',
        alignItems: 'center',
        gap: 10
    },
    titleContainer: {
        width: '90%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        gap: 10
    }
})

export default WallpaperGrid;