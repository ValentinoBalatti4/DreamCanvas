import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import CategoryCard from '../components/CategoryCard';
import SideBar from '../components/SideBar';

const HomeScreen = () => {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarIsOpen(!sidebarIsOpen);
    }

    return(
        <View style={styles.homeScreenContainer}>
            <TopBar toggleSidebar={toggleSidebar}/>
            { sidebarIsOpen && <SideBar toggleSidebar={toggleSidebar}/> }
            <ScrollView contentContainerStyle={styles.categoriesContainer}>
                <Text style={{color: '#AAAFB0', alignSelf: 'baseline', marginLeft: 15, marginBottom: 5}}>
                    Select Category
                </Text>
                <CategoryCard categoryTitle={'Nature'} src={'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}/>
                <CategoryCard categoryTitle={'Technology'} src='https://img.freepik.com/premium-photo/tech-devices-icons-connected-digital-planet-earth_117023-449.jpg'/>
                <CategoryCard categoryTitle={'Cars'} src='https://cdn.pixabay.com/photo/2020/09/06/07/37/car-5548242_640.jpg'/>
                <CategoryCard categoryTitle={'Abstract'} src='https://img.freepik.com/free-photo/abstract-colorful-splash-3d-background-generative-ai-background_60438-2509.jpg'/>
                <CategoryCard categoryTitle={'Space'} src='https://t3.ftcdn.net/jpg/05/69/72/02/360_F_569720237_58rhoQoMjxyB0QCeXQK0OVUA0qNogTmq.jpg'/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    homeScreenContainer: {
        flex: 1,
        backgroundColor: '#121212',
    },

    categoriesContainer:{
        alignItems: 'center',
        marginTop: 30,
        gap: 5
    },
    
    text:{
        color: '#AAAFB0'
    },
})

export default HomeScreen;