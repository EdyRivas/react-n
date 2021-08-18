import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Favorites from './Favorites';
import Colors from '../../Res/Colors';
import BadgesDetail from '../Details/BadgesDatail';

const Stack = createStackNavigator();
const FavoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false,
        headerStyle:{
          backgroundColor: Colors.blackPearl,
        },
        headerTintColor: Colors.white
      }}
    >
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="FavoritesDetails" component={BadgesDetail} />
    </Stack.Navigator>
  );
};
export default FavoritesStack;
