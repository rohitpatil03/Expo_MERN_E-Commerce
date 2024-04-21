import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LaptopScreen from './screens/LaptopScreen';
import LaptopDetailScreen from './screens/LaptopDetailScreen';
import CartScreen from './screens/CartScreen';
import CartIcon from './components/CartIcon';
import { CartProvider } from './context';
import { useCart } from './context';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const LaptopStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Laptop" component={LaptopScreen} />
      <Stack.Screen name="LaptopDetail" component={LaptopDetailScreen} />
    </Stack.Navigator>
  );
};

function Tabs() {
  const {cartItems} = useCart()
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Laptops" component={LaptopStack} options={{ headerShown: false,tabBarIcon: ({ color, size }) => <MaterialIcons name="laptop" size={24} color="black" />, }} />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarIcon: ({ color, size }) => <CartIcon count={cartItems.length} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Tabs />
    </CartProvider>
  );
}
