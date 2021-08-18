import React from 'react';
import {Image} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BadgesStack from './BadgesStack';
import UserStack from '../UsersScreen/UserStack';
import Colors from '../../Res/Colors';
import FavoritesStack from '../Favorites/FavoritesStack';

const Tabs = createMaterialTopTabNavigator();

const BadgesTabNavigator = () => {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        showLabel: true,
        tintColot: Colors.white,
        activeTintColor: '#43FF0D',
        style: {
          backgroundColor: Colors.zircon,
          paddingTop: 45,
        },
      }}>
      <Tabs.Screen
        name="Badges"
        component={BadgesStack}
        options={{
          tabBarIcon: ({size, color}) => (
            <Image
              style={{tintColor: color, width: size, height: size}}
              source={require('../../Assets/home.png')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Favorites"
        component={FavoritesStack}
        options={{
          tabBarIcon: ({size, color}) => (
            <Image
              style={{tintColor: color, width: size, height: size}}
              source={require('../../Assets/home.png')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={UserStack}
        options={{
          tabBarIcon: ({size, color}) => (
            <Image
              style={{tintColor: color, width: size, height: size}}
              source={require('../../Assets/home.png')}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};
export default BadgesTabNavigator;
