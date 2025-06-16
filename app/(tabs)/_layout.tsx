import { Tabs } from 'expo-router';
import './../globals.css';
import HomeIcon from '../../assets/images/home_icon.svg';
// import CartIcon from '../../assets/images/cart_icon.svg';
import CategoriesIcon from '../../assets/images/category_icon.svg';
import FeedIcon from '../../assets/images/feeds_icon.svg';
import TryOnIcon from '../../assets/images/tryon_icon.svg';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#00BFFF',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopWidth: 0,
          elevation: 0,
          height: 80, // Increased height
          paddingBottom: 16, // Extra padding for more clickable area
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <HomeIcon width={25} height={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => (
            <CategoriesIcon width={25} height={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color }) => (
            <CategoriesIcon width={25} height={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feeds',
          tabBarIcon: ({ color }) => (
            <FeedIcon width={25} height={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="try_on"
        options={{
          title: 'Try-on',
          tabBarIcon: ({ color }) => (
            <TryOnIcon width={25} height={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
