import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LaptopScreen from './LaptopScreen';
import LaptopDetailScreen from './LaptopDetailScreen';
import CartScreen from './CartScreen';
import CartIcon from './../components/CartIcon';
import { useCart } from './../context';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const LaptopStack = () => {
  const {deleteAsyncStorageData} = useCart()
  return (
    <Stack.Navigator>
      <Stack.Screen name="Laptop" component={LaptopScreen} options={{
        headerRight: () => (
          
          <TouchableOpacity
            onPress={()=>deleteAsyncStorageData('token')}
            color="#fff"
            style={{marginRight:10}}
          >
            <MaterialIcons name="logout" size={24} color="black" />
            </TouchableOpacity>
          
        ),
        headerShown: true
      }} />
      <Stack.Screen name="LaptopDetail" component={LaptopDetailScreen} />
    </Stack.Navigator>
  );
};

function Tabs() {
  const { cartItems, deleteAsyncStorageData } = useCart()
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Laptops" component={LaptopStack} options={{ headerShown: false, tabBarIcon: ({ color, size }) => <MaterialIcons name="laptop" size={24} color="black" />, }} />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarIcon: ({ color, size }) => <CartIcon count={cartItems.length} />,
            headerRight: () => (
          
              <TouchableOpacity
                onPress={()=>deleteAsyncStorageData('token')}
                color="#fff"
                style={{marginRight:10}}
              >
                <MaterialIcons name="logout" size={24} color="black" />
                </TouchableOpacity>
              
            ),
            headerShown: true
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Tabs
