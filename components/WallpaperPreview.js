import React from "react";
import { View, Text, TouchableOpacity, Image , StyleSheet} from 'react-native';
import { useNavigation } from "@react-navigation/native";

const WallpaperPreview = (props) => {
    const navigation = useNavigation();

    const navigateToWallpaperScreen = (category, wallpaperSource, wallpapers) => {
        navigation.navigate('wallpaperVisualizer', {category, wallpaperSource, wallpapers})
    }


    return(
        <TouchableOpacity style={styles.WallpaperPreviewContainer} onPress={() => navigateToWallpaperScreen(props.category, props.imageSource, props.wallpapers)}>
            <Image source={{ uri: props.imageSource }} style={styles.wallpaperPreviewImage}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    WallpaperPreviewContainer: {
        width: '90%',
        height: 200,
        marginBottom: 10
    },
    wallpaperPreviewImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
        borderRadius: 20,

    }
})

export default WallpaperPreview;