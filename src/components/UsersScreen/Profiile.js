import {CustomConsole} from '@jest/console';
import React from 'react';
import {
  View,
  Text,
  Scrollview,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import UserSession from '../../Lib/Sessions';
import Colors from '../../Res/Colors';

class Profile extends React.Component {
  state = {
    user: {
      profile: {},
    },
    token: '',
    picture: '',
  };
  componentDidMount = () => {
    this.getUserData();
  };

  handleProfileEdit = () => {
    const options = {
      includeBase64: false,
      mediaType: 'photo',
    };
    launchImageLibrary(options, response => {
      if(!response.didCancel){
        let photo = response.assets[0].uri;
        this.setState({picture: photo});
        this.editProfilePic();
      }
    });
  };
  editProfilePic = async () => {
    const {user, token, picture} = this.state;
    let response = await UserSession.instance.editProfile(
      user.id,
      token,
      picture,
    );
    console.log(response);
/*     this.setState({user: response}) */
  };

  getUserData = async () => {
    //here we got the user data and its token
    let user = await UserSession.instance.getUser();
    let token = await UserSession.instance.getToken(user.username);
    this.setState({user: user, token: token});
  };
  render() {
    const {user, picture} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.perfil}>
          <Image
            style={styles.h_p}
            source={{uri: `${user.profile.Header_P}`}}
          />
          <Image
            style={styles.picture}
            source={{uri: picture || `${user.profile.picture}`}}
          />
          <TouchableOpacity
            style={styles.prof_e}
            onPress={this.handleProfileEdit}>
            <Image
              style={styles.c_i}
              source={require('../../Assets/photo-camer.png')}
            />
          </TouchableOpacity>
          <View style={styles.data}>
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.age}>{user.profile.age}</Text>
          </View>
          <View style={styles.data2}>
            <Text style={styles.names}>
              {user.first_name} {user.last_name}. {user.profile.country}{' '}
              {user.profile.city}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  c_i: {
    marginLeft: '65%',
    marginTop: 1,
    backgroundColor: Colors.white,
    zIndex: 2,
  },
  perfil: {
    margin: 20,
    width: '90%',
    height: '90%',
    backgroundColor: Colors.white,
    borderRadius: 25,
  },
  h_p: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  picture: {
    width: 130,
    height: 130,
    resizeMode: 'cover',
    borderRadius: 100,
    borderWidth: 5,
    borderColor: Colors.zircon,
    position: 'absolute',
    top: '10%',
    left: '31%',
    zIndex: 1,
  },

  username: {
    width: '50%',
    marginTop: 20,
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.blackPearl,
    marginLeft: 20,
  },
  age: {
    fontSize: 28,
    marginTop: 20,
    color: Colors.zircon,
    marginLeft: -10,
  },

  names: {
    marginTop: '1%',
    marginLeft: '23%',
  },
  data: {
    padding: 20,

    justifyContent: 'center',
    flexDirection: 'row',
    width: 372,
  },

  smallText: {
    color: Colors.zircon,
  },
});
export default Profile;
