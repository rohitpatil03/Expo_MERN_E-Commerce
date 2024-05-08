import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, View, TouchableOpacity, Image, TextInput } from 'react-native';
import AppTextInput from '../components/AppTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCart } from '../context';
import axios from 'axios';


const LoginScreen = (props) => {
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
      else {
        props.navigation.navigate('Login')
      }
    }
    checkToken()
  }, [token])


  const handleSumbit = async () => {
    try {
      const response = await axios.post(`${process.env.BACKEND_URL}/api/login`, formData);
      const token = response.data.token;
      await storeAsyncStorageData("token", token)
      setToken(token)
      setStatus(true)
      setFormData({})
    }
    catch (e) {
      setStatus(false)
      console.log(e)
    }
  }
  return (
    <SafeAreaView>
      <View style={{ padding: 20, marginTop: 100 }}>
        <View style={{ alignItems: 'center' }}>

          <Text style={{ fontSize: 30, color: '#1f41bb', marginVertical: 30, fontWeight: 'bold' }}>
            Login Here
          </Text>
          <Text style={{ fontSize: 24, maxWidth: '60%', textAlign: 'center', fontWeight: '600' }}>
            Welcome back you've been missed!
          </Text>
        </View>
        <View style={{ marginVertical: 30 }}>
          <AppTextInput
            type='text'
            placeholder='Email'
            name='email'
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            value={formData.email}
            status={status}
          />
          <AppTextInput
            secureTextEntry={true}
            type='password'
            placeholder='Password'
            name='password'
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            value={formData.password}
            status={status}
          />
        </View>


        <View><TouchableOpacity onPress={() => {
          console.log('login');
          props.navigation.navigate("ForgetPassword")
        }}>
          <Text style={{
            fontSize: 14,
            color: '#1f41bb',
            alignSelf: 'flex-end'
          }}>
            Forgot your password ?
          </Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={{
          padding: 20,
          marginVertical: 30,
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
            Sign in
          </Text>

        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          console.log('login');
          props.navigation.navigate("Register");
        }} style={{
          padding: 10
        }}>

          <Text style={{
            color: '#000',
            textAlign: 'center',
            fontSize: 14
          }}>
            Create new account
          </Text>

        </TouchableOpacity>


      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
