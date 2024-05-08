import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native';

const AppTextInput = ({ status, ...otherProps }) => {
  const [focused, setFocused] = useState(false);
  

  return (
    <TextInput
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholderTextColor={'#626262'}
      style={[
        {
          fontSize: 14,
          padding: 20,
          borderRadius: 10,
          marginVertical: 10,
          borderColor: '#c2c2c2',
          borderWidth: 3,
        },
        focused && {
          borderColor: '#1f41bb',
          shadowOffset: { width: 4, height: 10 },
          shadowColor: '#1f41bb',
          shadowOpacity: 0.2,
          shadowRadius: 10,
        },
        !status && focused && {
          borderColor: 'red', // Change border color to red when status is false
          shadowOffset: { width: 4, height: 10 },
          shadowColor: '#1f41bb',
          shadowOpacity: 0.2,
          shadowRadius: 10,
        },
        !status && {
          borderColor: 'red', // Change border color to red when status is false
          shadowOffset: { width: 4, height: 10 },
          shadowColor: '#1f41bb',
          shadowOpacity: 0.2,
          shadowRadius: 10,
        },


      ]}
      {...otherProps}
    />
  );
};

export default AppTextInput;
