import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';



const SideBar = (props) => {
    const navigation = useNavigation();

    return(
        <View style={styles.sidebarContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{fontSize: 26, color:'#AAAFB0'}}>Sidebar</Text>
                <Icon name='close' size={30} color={'#AAAFB0'} onPress={props.toggleSidebar}/>
            </View>
            <View style={{marginTop: 40, gap: 15}}>

                <TouchableOpacity style={styles.sidebarOptions} onPress={() => navigation.navigate('home')}>
                    <Text style={styles.sidebarOptionsText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sidebarOptions}>
                    <Text style={styles.sidebarOptionsText}>Favorites</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sidebarOptions}>
                    <Text style={styles.sidebarOptionsText}>Downloaded</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sidebarContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#121212',
        width: '80%',
        height: '100%',
        paddingHorizontal: 20,
        paddingTop: 50,
        zIndex: 10,
    },

    sidebarOptions: {
        backgroundColor: '#4c4c4c53',
        padding: 7,
        borderRadius: 10
    },

    sidebarOptionsText: {color: '#AAAFB0', fontSize: 22},


})

export default SideBar;