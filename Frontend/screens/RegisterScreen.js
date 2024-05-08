import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, TouchableOpacity, Image } from 'react-native';
import AppTextInput from '../components/AppTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCart } from '../context';
import axios from 'axios';

const RegisterScreen = (props) => {
  const [formData, setFormData] = useState({});
  const { getAsyncStorageData, storeAsyncStorageData, token, setToken } = useCart()
  const [status, setStatus] = useState(true)

  useEffect(() => {
    const checkToken = async () => {
      const token = await getAsyncStorageData("token")
      console.log(token)
      if (token != null) {
        setToken(token)
        props.navigation.navigate('App')
      }
    }
    checkToken()
  }, [token])


  const handleSumbit = async () => {
    try {
      const response = await axios.post(`${process.env.BACKEND_URL}/api/register`, formData);
      const token = response.data.token;
      await storeAsyncStorageData("token", token)
      setFormData({})
      setToken(token)
      setStatus(true)
    }
    catch (e) {
      setStatus(false)
      console.log(e)
    }
  }


  return (
    <SafeAreaView>
      <View style={{ padding: 20, marginTop:50 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 30, color: '#1f41bb', marginVertical: 30, fontWeight: 'bold' }}>
            Create Account
          </Text>
          <Text style={{ fontSize: 20, maxWidth: '80%', textAlign: 'center', fontWeight: '600' }}>
            Create an account so you can explore all the Social platform
          </Text>
        </View>
        <View style={{ marginVertical: 30 }}>
          <AppTextInput status={status} type='text' name='username' placeholder='Username' onChangeText={(text) => setFormData({ ...formData, username: text })} value={formData.username}/>
          <AppTextInput status={status} type='text' name='email' placeholder='Email' onChangeText={(text) => setFormData({ ...formData, email: text })} value={formData.email}/>
          <AppTextInput status={status} secureTextEntry={true} type='password' name='password' placeholder='Password' onChangeText={(text) => setFormData({ ...formData, password: text })} value={formData.password}/>
          <AppTextInput status={status} secureTextEntry={true} type='password' name='confirmPassword' placeholder='Confirm Password' onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })} value={formData.confirmPassword}/>
        </View>
        <TouchableOpacity style={{
          padding: 20,
          marginVertical: 10,
          backgroundColor: '#1F41BB',
          borderRadius: 10,
          shadowColor: '#1f41bb',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.3,
          shadowRadius: 10
        }}
        onPress={handleSumbit}>
          <Text style={{
            color: '#fff',
            textAlign: 'center',
            fontSize: 20
          }}>
            Sign up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          console.log('login');
          props.navigation.navigate("Login");
        }} style={{ padding: 10 }}>
          <Text style={{
            color: '#000',
            textAlign: 'center',
            fontSize: 14
          }}>
            Already have an account
          </Text>
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
