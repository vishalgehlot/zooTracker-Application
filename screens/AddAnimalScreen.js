import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Alert, Modal, ScrollView } from 'react-native';
import tw from 'twrnc';
import { useDispatch } from 'react-redux';
import { addAnimal, editAnimal } from '../redux/animalSlice';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';

const AddAnimalScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const animal = route.params?.animal;

  const [name, setName] = useState(animal?.name || '');
  const [breed, setBreed] = useState(animal?.breed || '');
  const [description, setDescription] = useState(animal?.description || '');
  const [image, setImage] = useState(animal?.image || '');
  const [modalVisible, setModalVisible] = useState(false);

  const pickImageAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please allow access to your media library.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setModalVisible(false); 
    } else {
      Alert.alert('No Image Selected', 'You did not select any image.');
    }
  };

  const handleSubmit = () => {
    if (!name || !breed || !description || !image) {
      Alert.alert('Missing Fields', 'Please fill in all fields and select an image.');
      return;
    }
    const animalData = { name, breed, description, image };
    if (animal) {
      dispatch(editAnimal({ id: animal.id, updatedData: animalData }));
    } else {
      dispatch(addAnimal({ id: Date.now().toString(), ...animalData }));
    }
    navigation.navigate('ListScreen');
  };

  return (
    <ScrollView contentContainerStyle={tw`flex-grow justify-center items-center bg-black p-4`}>
      <View style={tw`w-full bg-gray-900 border-2 border-yellow-400 shadow-lg p-6 rounded-lg`}>
        
        <Text style={tw`text-yellow-400 text-3xl font-bold text-center mb-4`}>
          {animal ? 'Edit Animal' : 'Add Animal'}
        </Text>

        <View style={tw`flex items-center mt-5`}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image 
              source={image ? { uri: image } : require('../assets/images/a.jpeg')} 
              style={tw`w-40 h-40 rounded-full bg-gray-600 border-2 border-yellow-400`}
            />
            <Ionicons style={tw`ml-28 absolute mt-23`} name="create" size={50} color="white" />
          </TouchableOpacity>
        </View>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Animal Name"
          placeholderTextColor="#fff"
          style={tw`bg-gray-700 text-white p-4 mt-4 rounded-lg text-lg`}
        />

        <TextInput
          value={breed}
          onChangeText={setBreed}
          placeholder="Breed"
          placeholderTextColor="#fff"
          style={tw`bg-gray-700 text-white p-4 mt-4 rounded-lg text-lg`}
        />

        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
          placeholderTextColor="#fff"
          multiline
          style={tw`bg-gray-700 text-white p-4 mt-4 rounded-lg text-lg min-h-20`}
        />

        <TouchableOpacity style={tw`bg-yellow-400 p-4 rounded-lg mt-6`} onPress={handleSubmit}>
          <Text style={tw`text-black text-2xl text-center font-bold`}>
            {animal ? 'Update' : 'Add'}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`w-80 bg-white p-5 rounded-lg shadow-lg`}>
            <TouchableOpacity style={tw`bg-gray-700 p-3 rounded-lg mb-3`} onPress={pickImageAsync}>
              <Text style={tw`text-white text-center text-lg`}>Pick from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={tw`bg-red-500 p-3 rounded-lg`} onPress={() => setModalVisible(false)}>
              <Text style={tw`text-white text-center text-lg`}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default AddAnimalScreen;
