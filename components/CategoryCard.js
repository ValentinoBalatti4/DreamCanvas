import React from "react";
import { View, Text , Image, StyleSheet, TouchableOpacity } from 'react-native';

const CategoryCard = (props) => {

    


    return(
        <TouchableOpacity style={styles.categoryContainer} onPress={null} >
            <Image source={{uri: props.src}} style={styles.categoryImage}/>
            <Text style={styles.categoryText}>{props.categoryTitle}</Text>
        </TouchableOpacity>
    )
} 

const styles = StyleSheet.create({
    categoryContainer: {
        width: '100%',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
    },

    categoryImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
        borderRadius: 30,
        opacity: 0.6
    },
    
    categoryText: {
        position: 'absolute',
        color: '#AAAFB0',
        fontSize: 26,
        fontWeight: '500'
    }
})

export default CategoryCard;