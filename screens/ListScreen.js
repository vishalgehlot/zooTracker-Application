import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import { removeAnimal } from '../redux/animalSlice';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';


const ListScreen = () => {
  const animals = useSelector(state => state.animals.animals);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleRemove = (id) => {
  Alert.alert(
    "Confirm Deletion", 
    "Are you sure you want to delete this data ?", 
    [ {text: "Yes", onPress: () => dispatch(removeAnimal(id))},{ text: "No",style: "cancel"}]
  );
  };

  const handleEdit = (animal) => {
    navigation.navigate('AddAnimalScreen', { animal });
  };

  return (
    <View style={tw`flex-1 bg-black p-4`}>
      <Text style={tw`text-yellow-400 text-3xl font-bold mb-4 text-center`}>Animal List</Text>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {animals.map((item) => (
          <View key={item.id} style={tw`bg-gray-900 rounded-lg p-4 mb-4 mx-2 shadow-lg`}>

            <Image 
              source={{ uri: item.image }} 
              style={tw`w-4/5 h-50 self-center rounded-lg`} 
            />

            <View style={tw`mt-0`}>
              <Text style={tw`text-white text-xl font-bold mt-4 ml-9`}>Name : {item.name}</Text>
              <Text style={tw`text-white text-lg mt-3 ml-8`}> Breed : {item.breed}</Text>
              <Text style={tw`text-white text-sm mt-3 ml-9`}>Description : {item.description}</Text>
            </View>

            <View style={tw`flex-row justify-between top-0 absolute`}>
              <TouchableOpacity
                style={tw`bg-yellow-400 p-2 rounded-full h-10 w-10 mt-4 ml-10`}
                onPress={() => handleEdit(item)}>
                <Ionicons name="create" size={24} color="black" />
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`bg-red-500 p-2 rounded-full h-10 w-10 mt-4 ml-51`}
                onPress={() => handleRemove(item.id)}>
                <Ionicons name="trash" size={24} color="black" /> 
              </TouchableOpacity>
            </View>

          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={tw`absolute bottom-10 right-10 bg-yellow-400 p-4 rounded-full`}
        onPress={() => navigation.navigate('AddAnimalScreen')}>
        <Text style={tw`w-6 h-6 text-center bottom-1 text-black text-2xl`}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListScreen;