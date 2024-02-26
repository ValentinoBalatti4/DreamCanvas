import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TopBar = (props) => {
    return(
        <View style={styles.topbarContainer}>
            <Icon name='menu' size={30} color={'#AAAFB0'} onPress={props.toggleSidebar}/>
            <Text style={styles.title}>WallPapers App</Text>
            <Icon name='search' size={30} color={'#AAAFB0'}/>
        </View>
    )
}

const styles = StyleSheet.create({
    topbarContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 25,
        paddingHorizontal: 20,
        marginTop: 30,
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#AAAFB0'
    }
})

export default TopBar;