import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import TopBar from '../components/TopBar';
import CategoryCard from '../components/CategoryCard';
import Icon from 'react-native-vector-icons/MaterialIcons';

// import SideBar from '../components/SideBar';

import fetchImages from '../utils/apiCalls';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    // const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    // const toggleSidebar = () => {
    //     setSidebarIsOpen(!sidebarIsOpen);
    // }

    const [isLoading, setIsLoading] = useState(false);
    const [wallpapers, setWallpapers] = useState([])
    const navigation = useNavigation();

    useEffect(() => {
        const fetchPopularImages = async () => {
            setIsLoading(true);
            try {
              const fetchedImages = await fetchImages('popular');
              setWallpapers(fetchedImages);
            } catch (error) {
              console.error('Error fetching initial images:', error);
            } finally {
              setIsLoading(false);
            }
          };
          fetchPopularImages();
    }, [])

    const selectImage = (wallpaperSource) => {
        navigation.navigate('wallpaperVisualizer', {category: 'popular', wallpaperSource, wallpapers})
    }

    const goToPopularList = () => {
        navigation.navigate('wallpaperGrid', {category: 'popular', categoryImg: undefined});
    } 

    return(
        <View style={styles.homeScreenContainer}>
            <TopBar/>
            {/* { sidebarIsOpen && <SideBar toggleSidebar={toggleSidebar}/> } */}
            <ScrollView contentContainerStyle={styles.contentContainer} >
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', width: '100%'}} onPress={() => goToPopularList()}>
                <Text style={{color: '#AAAFB0', fontSize: 16, alignSelf: 'baseline', marginLeft: 15, marginBottom: 5}}>Popular Today</Text>
                <Icon name='arrow-forward' size={15} color={'#aaafb0'}/>
            </TouchableOpacity>
                
                <FlatList
                    horizontal={true}
                    data={wallpapers}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{width: 120, height: 200}} onPress={() => selectImage(item.src.portrait)}>
                            <Image source={{ uri: item.src.portrait }} style={{height: '100%', width: '100%', borderRadius: 13}}/>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.featuredContainer}
                />
                <Text style={{color: '#AAAFB0', fontSize: 15, alignSelf: 'baseline', marginLeft: 15, marginBottom: 5}}>
                    Select Category
                </Text>
                <CategoryCard categoryTitle={'Nature'} src={'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}/>
                <CategoryCard categoryTitle={'Technology'} src='https://img.freepik.com/premium-photo/tech-devices-icons-connected-digital-planet-earth_117023-449.jpg'/>
                <CategoryCard categoryTitle={'Cars'} src='https://cdn.pixabay.com/photo/2020/09/06/07/37/car-5548242_640.jpg'/>
                <CategoryCard categoryTitle={'Animals'} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHQ9CQjK8kox2iyII-QT96Qo6F2Wfp11Hkaw&usqp=CAU'/>           
                <CategoryCard categoryTitle={'Space'} src='https://t3.ftcdn.net/jpg/05/69/72/02/360_F_569720237_58rhoQoMjxyB0QCeXQK0OVUA0qNogTmq.jpg'/>
                <CategoryCard categoryTitle={'Abstract'} src='https://img.freepik.com/free-photo/abstract-colorful-splash-3d-background-generative-ai-background_60438-2509.jpg'/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    homeScreenContainer: {
        flex: 1,
        backgroundColor: '#121212',

    },

    contentContainer:{
        alignItems: 'center',
        marginTop: 30,
        gap: 5,
    },
    
    featuredContainer: {
        gap: 10,
        marginBottom: 20
    },


    text:{
        color: '#AAAFB0'
    },
})

export default HomeScreen;