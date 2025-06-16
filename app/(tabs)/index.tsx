import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Image,
  ImageSourcePropType,
} from "react-native";
import { Heart, User, ChevronDown, Home } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import HomeVids from "@/components/home/vidsgrid";

// Props for CategoryButton
interface CategoryButtonProps {
  label: string;
  image: ImageSourcePropType;
  textLeft: number;
}

// Reusable Category Button component
const CategoryButton: React.FC<CategoryButtonProps> = ({ label, image, textLeft }) => (
  <TouchableOpacity className="flex-1 mx-1">
    <View className="rounded-2xl p-2 border-2 border-white flex-row items-center justify-between h-14 overflow-visible relative">
      <Image
        source={image}
        className="w-11 h-16 absolute bottom-0 left-3"
        resizeMode="cover"
      />
      <Text
        className="text-white text-sm font-bold flex-1 text-center"
        style={{
          left: textLeft,
        }}
      >
        {label}
      </Text>
    </View>
  </TouchableOpacity>
);

const Index: React.FC = () => {
  const [showAddressOptions, setShowAddressOptions] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Top Header Section */}
      <LinearGradient
        colors={[
          "#00CFFF",
          "rgba(0, 207, 255, 0.7)",
          "rgba(0, 207, 255, 0.3)",
          "rgba(0, 207, 255, 0)",
        ]}
        locations={[0, 0.4, 0.7, 1]}
        className="pt-6 pb-4 px-4"
      >
        {/* Title Row */}
        <View className="flex-row items-center mb-1">
          <Home color="white" size={20} />
          <Text
            className="text-white text-lg font-semibold ml-2 mr-1"
           onPress={() => setShowAddressOptions(!showAddressOptions)}
          >
            Home
          </Text>
          <TouchableOpacity onPress={() => setShowAddressOptions(!showAddressOptions)}>
            <ChevronDown color="white" size={20} />
          </TouchableOpacity>
        </View>

        {/* Address Options Dropdown */}
        {showAddressOptions && (
          <View className=" rounded-md p-3 mb-3">
            <Text className="text-white font-semibold mb-2">Select Address:</Text>
            <TouchableOpacity className="mb-2">
              <Text className="text-white">Home - 156, 15th Flr, Maker Chambers</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className="text-red-400">+ Add New Address</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Address & Icons */}
        <View className="flex-row justify-between items-center mb-4">
          <Text
            className="text-white text-sm flex-1"
            style={{ fontFamily: Platform.OS === "ios" ? "System" : "Roboto" }}
          >
            Home - 156, 15th Flr, Maker Chamb...
          </Text>
          <View className="flex-row items-center space-x-4 ml-4">
            <Heart color="white" size={25} />
            <User color="white" size={25} />
          </View>
        </View>

        {/* Search Bar */}
        <TextInput
          placeholder="Search for products"
          placeholderTextColor="#999"
          className="bg-white rounded-full px-4 py-3 text-gray-800"
        />
      </LinearGradient>

      {/* Bottom Section */}
      <View className="flex-1 bg-black px-4 pt-6">
        {/* Category Buttons */}
        <View className="flex-row justify-between mb-6 -mt-4">
          <CategoryButton
            label="All"
            image={require("../../assets/images/zwishh-social-1.png")}
            textLeft={25}
          />
          <CategoryButton
            label="Men"
            image={require("../../assets/images/zwishh-social-2.png")}
            textLeft={17}
          />
          <CategoryButton
            label="Women"
            image={require("../../assets/images/zwishh-social-3.png")}
            textLeft={20}
          />
        </View>

        {/* Main Content */}
        <HomeVids />
      </View>
    </SafeAreaView>
  );
};

export default Index;
