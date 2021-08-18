import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BadgeLanding from '../Landing/BadgesLanding';
import Colors from '../../Res/Colors';
import BadgesDetail from '../Details/BadgesDatail';
import BadgesScreen from './BadgesScreen';
import BadgesEdit from '../BadgesEdit/BadgesEdit';
const Stack = createStackNavigator();

const BadgesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: Colors.blackPearl,
          shadowColor: Colors.blackPearl,
        },
        headerTintColor: Colors.white,
      }}>
      {/*<Stack.Screen name="Signup" component={Signup}/>
            <Stack.Screen name="login" component={Login}/>*/}

      <Stack.Screen name="Badges" component={BadgesScreen} />
      <Stack.Screen name="BadgesDetail" component={BadgesDetail} />
      <Stack.Screen name="BadgesEdit" component={BadgesEdit} />
    </Stack.Navigator>
  );
};

export default BadgesStack;
