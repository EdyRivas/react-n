import React from 'react';
import Colors from '../../Res/Colors';
import UserSession from '../../Lib/Sessions';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import Loader from '../Generics/Loader';
const Background = {
  uri: `https://images.pexels.com/photos/7091640/pexels-photo-7091640.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`,
};
class Login extends React.Component {
  state = {
    loading: false,
    errors: [],
    user: undefined,
    isPasswordVisible: true,
    form: {},
  };

  componentDidMount=()=>{
    this.deleteTokens();
  }

  deleteTokens = async()=>{
    await UserSession.instance.logout();
  }

  handleSignup = () => {
    //event to redirect to the signup page
    this.props.navigation.navigate('Signup');
  };

  handleSubmit = async () => {
    //in this event we check if the data inserted is in our database and if it is not
    //we send some errors according with the error
    //and if we do not have an error and the user is the database and is verifies
    //the app will redirect us to home
    try {

      this.setState({loading: true, error: null, user: undefined});
      let response = await UserSession.instance.login(this.state.form);
      if (typeof response == 'object') {
        console.log(response);
        if (response['405']) {
          var message = 'Your account is not verified';
        } else {
          var message = 'Invalid username or password, try again';
        }
        this.setState({loading: false, error: message, user: undefined});
      } else {
        this.setState({loading: false, error: null, user: response});
      }
    } catch (err) {
      this.setState({loading: false, error: err});
    }
    if (this.state.user) {
      this.props.navigation.replace('BadgesTabNavigator');
    }
  };

  ToggleisPasswordVisible = () => {
    //here we handle the way of tha password is shown by clicking an icon
    if (this.state.isPasswordVisible) {
      this.setState({isPasswordVisible: false});
    } else {
      this.setState({isPasswordVisible: true});
    }
  };

  render() {
    const {isPasswordVisible, loading, error} = this.state;
    if (loading == true) {
      return <Loader />;
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          <StatusBar backgroundColor="transparent" translucent={true} />

          <ImageBackground source={Background} style={styles.image}>
            <View style={styles.layerColor}>
              <Text style={styles.title}>Welcome</Text>

              <View>
                <View style={styles.logoContainer}>
                  <Image
                    style={styles.logo}
                    source={{
                      uri: 'https://icons-for-free.com/iconfiles/png/512/profile+profile+page+user+icon-1320186864367220794.png',
                    }}></Image>
                </View>
              </View>

              <View style={styles.login}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.form}
                    placeholder="User name"
                    placeholderTextColor={Colors.charade}
                    onChangeText={text => {
                      this.setState(prevState => {
                        let form = Object.assign({}, prevState.form);
                        form.username = text;
                        return {form};
                      });
                    }}
                  />
                  <TextInput
                    secureTextEntry={isPasswordVisible}
                    style={styles.form}
                    placeholder="Password"
                    placeholderTextColor={Colors.blackPearl}
                    onChangeText={text => {
                      this.setState(prevState => {
                        let form = Object.assign({}, prevState.form);
                        form.password = text;
                        return {form};
                      });
                    }}
                  />
                </View>
                <TouchableOpacity  style={styles.visible} onPress={this.ToggleisPasswordVisible}>
                  <Image
                    source={
                      isPasswordVisible
                        ? require('../../Assets/hide.png')
                        : require('../../Assets/show.png')
                    }
                  />
                </TouchableOpacity>
                <View style={styles.errs}>
                  {error ? (
                    <View style={styles.errs}>
                      <Text style={styles.errs}>{error}</Text>
                    </View>
                  ) : null}</View>
                <TouchableOpacity
                  style={styles.buttonDark}
                  onPress={this.handleSubmit}>
                  <Text style={styles.buttonDarkText}>LOGIN</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.signup}>
              <Text style={styles.signupText}>Don't have an account?</Text>
              <TouchableOpacity
                style={styles.buttonLight}
                onPress={this.handleSignup}>
                <Text style={styles.buttonLightText}>SIGN UP</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',

    justifyContent: 'center',
    width:"100%",
    height:900,
    backgroundColor: Colors.white,
  },
  visible:{
    marginLeft:200,
    marginTop: -50
  },
  errs: {
    width:'90%',
    zIndex: 1,
    color: '#8B0000',
    marginTop:5,
    marginLeft:18
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',

    overflow: 'hidden',
    marginTop: -150,
    paddingTop: 205,
    paddingBottom: 130,
    marginBottom: -75,
  },

  logoContainer: {
    alignSelf: 'center',
    marginTop: -100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.0,
    elevation: 20,

    backgroundColor: Colors.white,

    width: 110,
    height: 110,
    resizeMode: 'cover',
    borderRadius: 90,
    position: 'absolute',

    zIndex: 2,
  },

  logo: {
    width: 145,
    height: 105,
    justifyContent: 'center',
    alignSelf: 'center',

    zIndex: 2,
  },

  layerColor: {
    flex: 2,

    justifyContent: 'center',

    alignItems: 'center',
  },

  title: {
    marginBottom: 120,
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.white,

    color: Colors.white,
  },

  login: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },

    height: 300,
    marginTop: -30,
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    backgroundColor: Colors.white,
    width: 261,
    borderRadius: 15,
    display: 'flex',

    // justifyContent: 'center',

    alignItems: 'center',
    zIndex: 1,
    position: 'relative',
  },

  inputContainer: {
    paddingTop: 40,
    marginBottom: -30,
  },

  form: {
    paddingHorizontal: 20,
    color: Colors.charade,
    borderColor: Colors.charade,
    borderWidth: 1,
    marginBottom: 50,
    width: 150,
    height: 40,
    textAlign: 'center',
    borderRadius: 10,
    marginTop: 15,
  },

  signup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 50,
  },

  signupText: {
    marginTop: -15,
    color: Colors.white,
    fontWeight: 'bold',
    marginBottom:50
  },

  buttonLight: {
    width: 193,
    padding: 15,
    marginTop: -10,
    borderRadius: 15,
    backgroundColor: Colors.white,
    borderColor: Colors.charade,
    borderWidth: 2.5,
  },

  buttonLightText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 25,
    color: Colors.charade,
  },
  buttonDark: {
    width: 193,
    padding: 15,
    marginTop: 270,
    // marginBottom: 0,
    backgroundColor: Colors.charade,
    borderRadius: 15,
    borderColor: Colors.charade,
    borderWidth: 1,
    justifyContent: 'center',
    zIndex: 5,
    position: 'absolute',
  },

  buttonDarkText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 25,
    color: Colors.white,
  },
});

export default Login;
