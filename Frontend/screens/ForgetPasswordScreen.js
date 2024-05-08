import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, View, TouchableOpacity, Image, TextInput } from 'react-native';
import AppTextInput from '../components/AppTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCart } from '../context';
import axios from 'axios';


const ForgotPasswordScreen = (props) => {
    const [formData, setFormData] = useState({});
    const [status, setStatus] = useState(true)



    const handleSumbit = async () => {
        try {
            const response = await axios.post(`${process.env.BACKEND_URL}/api/reset`, formData);
            
            setFormData({})
            props.navigation.navigate('Login')
            setStatus(true)
            
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
                        Change Password Here
                    </Text>
                    <Text style={{ fontSize: 24, maxWidth: '80%', textAlign: 'center', fontWeight: '600' }}>
                        Update your password for better security.
                    </Text>
                </View>
                <View style={{ marginVertical: 30 }}>
                    <AppTextInput
                        status={status}
                        type='text'
                        placeholder='Email'
                        name='email'
                        onChangeText={(text) => setFormData({ ...formData, email: text })}
                        value={formData.email}
                    />
                    <AppTextInput
                        secureTextEntry={true}
                        status={status}
                        type='password'
                        placeholder='Password'
                        name='password'
                        onChangeText={(text) => setFormData({ ...formData, password: text })}
                        value={formData.password}
                    />
                    <AppTextInput
                        secureTextEntry={true}
                        status={status}
                        type='password'
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                        value={formData.confirmPassword}
                    />
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
                        Change Password
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    console.log('login');
                    props.navigation.navigate("Login");
                }} style={{
                    padding: 10
                }}>

                    <Text style={{
                        color: '#000',
                        textAlign: 'center',
                        fontSize: 14
                    }}>
                        Sign In
                    </Text>

                </TouchableOpacity>


            </View>
        </SafeAreaView>
    );
};

export default ForgotPasswordScreen;
