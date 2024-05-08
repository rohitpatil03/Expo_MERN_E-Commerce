import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CartProvider } from './context';
import { useCart } from './context';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Tabs from './screens/AppScreen';
import ForgotPasswordScreen from './screens/ForgetPasswordScreen';

const Tab = createBottomTabNavigator();


const LoginStack = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Login" component={LoginScreen} options={{
          headerShown: false, tabBarStyle: {
            display: 'none',
          },
        }} />
        <Tab.Screen name="Register" component={RegisterScreen} options={{
          headerShown: false, tabBarStyle: {
            display: 'none',
          },
        }} />
        <Tab.Screen name="ForgetPassword" component={ForgotPasswordScreen} options={{
          headerShown: false, tabBarStyle: {
            display: 'none',
          },
        }} />
        <Tab.Screen name="App" component={Tabs} options={{
          headerShown: false, tabBarStyle: {
            display: 'none',
          },
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <CartProvider>
      <LoginStack />
    </CartProvider>
  );
}
