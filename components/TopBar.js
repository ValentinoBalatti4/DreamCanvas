import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TopBar = (props) => {
    const navigation = useNavigation();
    const [searchBoxVisibile, setSearchBoxVisible] = useState(false);

    const toggleSearchBox = () => {
        setSearchBoxVisible(!searchBoxVisibile);
    }
    
    const handleSearch = (query) => {
        navigation.navigate('wallpaperGrid', {category: query, categoryImg: undefined})
        toggleSearchBox()
    }

    return(
        <View style={styles.topbarContainer}>
            {/* <Icon name='menu' size={30} color={'#AAAFB0'} onPress={props.toggleSidebar}/> */}
            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('favoritesScreen')}>
                <Icon name='favorite' size={30} color={'#AAAFB0'}/>
            </TouchableOpacity>
            <Text style={styles.title} onPress={() => navigation.navigate("home")}>DreamCanvas</Text>
            <Icon name={'search'} size={30} color={'#AAAFB0'} onPress={toggleSearchBox}/>
            <Modal
                animationIn={"slideInRight"}
                animationOut={"slideOutRight"}
                transparent={true}
                isVisible={searchBoxVisibile}
                onRequestClose={toggleSearchBox}
            >
                <TextInput
                    style={styles.searchInput}
                    placeholder='Search...'
                    autoFocus={true}
                    onSubmitEditing={(e) => handleSearch(e.nativeEvent.text)}
                />
                <TouchableOpacity style={{position: 'absolute', top: 45, right: 5, borderRadius: '50%'}} onPress={() => toggleSearchBox()}>
                    <Icon name='close' size={30} color={'#121212'}/>
                </TouchableOpacity>
            </Modal>
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
    },
    searchInput: { 
        position: 'absolute',
        top: 40,
        left: 0,
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: 'white',
        paddingHorizontal: 15,

    },

})

export default TopBar;