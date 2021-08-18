import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BadgesTabNavigator from '../BadgesScreen/BadgesTabNavigator';
import BadgeLanding from '../Landing/BadgesLanding';
import Colors from '../../Res/Colors';
import Login from '../UsersScreen/login';
import Signup from '../UsersScreen/signup';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: Colors.charade,
          shadowColor: Colors.charade,
        },
        headerTintColor: Colors.white,
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <Stack.Screen name="BadgesTabNavigator" component={BadgesTabNavigator} />
    </Stack.Navigator>
  );
};

export default AppStack;
