import { Text, View, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { Heart, User, ChevronDown, Home } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';
import HomeVids from "@/components/home/vidsgrid";
// import { styled } from 'nativewind'

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-black">
  {/* Top 20% - Blue Section with Gradient Fade */}
  <LinearGradient
    colors={['#00CFFF', 'rgba(0, 207, 255, 0.7)', 'rgba(0, 207, 255, 0.3)', 'rgba(0, 207, 255, 0)']}
    locations={[0, 0.4, 0.7, 1]}
    className="h-1/5 px-4 pt-6"
  >
    {/* Header with Home title and icons */}
    <View className="flex-row items-center justify-between mb-4">
      <View className="flex-row items-center">
        <Home color="white" size={20} />
        <Text className="text-white text-xl font-semibold ml-2 mr-2">Home</Text>
        <ChevronDown color="white" size={20} />
      </View>
      <View className="flex-row items-center space-x-4">
        <Heart color="white" size={24} />
        <User color="white" size={24} />
      </View>
    </View>
    {/* Address */}
    <Text className="text-white text-sm mb-4">
      Home - 156, 15th Flr, Maker Chamb...
    </Text>
    {/* Search Bar */}
    <TextInput
      placeholder="Search for products"
      placeholderTextColor="#999"
      className="bg-white rounded-full px-4 py-3 text-gray-800"
    />
  </LinearGradient>

  {/* Bottom 80% - Black Section */}
  <View className="flex-1 bg-black px-4 pt-6">
    {/* Category Buttons */}
   <View className="flex-row justify-between mb-6 -mt-4">
  <TouchableOpacity className="flex-1 mr-2">
    <View className=" rounded-2xl p-2 border-2 border-white flex-row items-center justify-between h-16 overflow-visible relative">
      <Image 
        source={require('../../assets/images/zwishh-social-1.png')}
        className="w-[55px] h-20 absolute bottom-0 left-3 "
        resizeMode="cover"
      />
      <Text className="text-white text-sm font-bold flex-1 text-center left-10">All</Text>
    </View>
  </TouchableOpacity>

  <TouchableOpacity className="flex-1 mx-1">
    <View className="rounded-2xl p-2 border-2 border-white flex-row items-center justify-between h-16 overflow-visible relative">
      <Image 
        source={require('../../assets/images/zwishh-social-2.png')}
        className="w-12 h-20 absolute bottom-0 left-3"
        resizeMode="cover"
      />
      <Text className="text-white text-sm font-bold flex-1 text-center left-7">Men</Text>
    </View>
  </TouchableOpacity>

  <TouchableOpacity className="flex-1 ml-2">
    <View className="rounded-2xl p-2 border-2 border-white flex-row items-center justify-between h-16 overflow-visible relative">
      <Image 
        source={require('../../assets/images/zwishh-social-3.png')}
        className="w-12 h-20 absolute bottom-0 left-3"
        resizeMode="cover"
      />
      <Text className="text-white text-sm font-bold flex-1 text-center left-8">Women</Text>
    </View>
  </TouchableOpacity>
</View>

    {/* Rest of your content goes here */}
    <HomeVids />
  </View>
</SafeAreaView>

  );
}
