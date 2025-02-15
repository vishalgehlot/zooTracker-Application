import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`flex-1 items-center bg-black px-4 justify-center`}>

      <Text style={tw`text-yellow-400 text-2xl font-bold mb-4 text-center`}>
        Welcome to ZooTracker
      </Text>

      <Image
        source={{ uri: 'https://img.veenaworld.com/wp-content/uploads/2021/05/Zoo-Park-Hyderabad-Timings-Ticket-Price-How-to-Visit.jpg' }}
        style={tw`w-full h-1/2 rounded-lg my-4`}
      />

      <Text style={tw`text-white text-center`}>
        Explore the amazing world of animals. Our zoo is home to a diverse range of creatures, from the fiercest predators to the gentlest herbivores.
      </Text>

      <Text style={tw`text-white text-center mt-4`}>
        At ZooTracker, we have a vast collection of animals from different habitats and species. Whether you love big cats, playful pets, or exotic birds, our tracker helps you keep all their details in one place.
      </Text>

      <TouchableOpacity
        style={tw`bg-yellow-400 px-6 py-3 rounded-lg mt-6`}
        onPress={() => navigation.navigate('ListScreen')}
      >
        <Text style={tw`text-black font-bold text-lg`}>Animal List</Text>
      </TouchableOpacity>

    </View>
  );
};

export default HomeScreen;
