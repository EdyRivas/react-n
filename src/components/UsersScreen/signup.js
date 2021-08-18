import React from 'react';
import Colors from '../../Res/Colors';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import Loader from '../Generics/Loader';
import UserSession from '../../Lib/Sessions';

class Signup extends React.Component {
  state = {
    loading: false,
    errors: [],
    user: undefined,
    isPasswordVisible: true,
    isPasswordConfVisible: true,
    form: {},
  };
  handleSubmit = async () => {
    //in this event we handle if the user is sending data or not,
    //by a counting method to show all the errors we have like
    //if the user is not sending data, the user will recive an error of empty data
    //or if that data was alredy registered it will have that result
    //and the last error is that the passwords don't match
    //they are shown at the same time if the error is there
    //if there were no errors the data is saved and the user redirected to login
    try {
      this.setState({loading: true, user: undefined});
      let response = await UserSession.instance.signup(this.state.form);
      if (typeof response == 'object') {
        let errors = [];
        let cont = 0;

        for (let error in response) {
          let key = error;
          if (error == 'non_field_errors') {
            error = 'password';
          }

          errors.push(
            <View key={cont}>
              <Text>{`${error} : ${response[key][0]}`}</Text>
            </View>,
          );
          cont++;
        }
        this.setState({loading: false, user: undefined, errors: errors});
      } else {
        this.setState({
          loading: false,
          user: response,
          errors: [],
        });
        if (this.state.user) {
          this.props.navigation.navigate('Login');
        }
      }
    } catch (err) {
      console.log('Sign up err', err);
      throw Error(err);
    }
  };

  ToggleisPasswordVisible = () => {
    //here we make that the password is visible or not 
    if (this.state.isPasswordVisible) {
      this.setState({isPasswordVisible: false});
    } else {
      this.setState({isPasswordVisible: true});
    }
  };

  ToggleisPasswordConfVisible = () => {
    //here we make that the password conf is visible or not 
    if (this.state.isPasswordConfVisible) {
      this.setState({isPasswordConfVisible: false});
    } else {
      this.setState({isPasswordConfVisible: true});
    }
  };
  render() {
    const {isPasswordVisible, loading, user, errors, isPasswordConfVisible} =
      this.state;
    if (loading == true) {
      return <Loader />;
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          <StatusBar backgroundColor="transparent" translucent={true} />
          <View>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={{
                  uri: 'https://icons-for-free.com/iconfiles/png/512/profile+profile+page+user+icon-1320186864367220794.png',
                }}></Image>
            </View>
          </View>
          <View style={styles.formShadow}>
            <View style={styles.inputContainer}>
              <Text style={styles.title}>Add your info</Text>
              <TextInput
                style={styles.form}
                placeholder="User name"
                placeholderTextColor={Colors.blackPearl}
                onChangeText={text => {
                  this.setState(prevState => {
                    let form = Object.assign({}, prevState.form);
                    form.username = text;
                    return {form};
                  });
                }}
              />
              <TextInput
                style={styles.form}
                placeholder="Email"
                keyboardType="email-address"
                placeholderTextColor={Colors.blackPearl}
                onChangeText={text => {
                  this.setState(prevState => {
                    let form = Object.assign({}, prevState.form);
                    form.email = text;
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
              <TouchableOpacity
                style={styles.shown}
                onPress={this.ToggleisPasswordVisible}>
                <Image
                  source={
                    isPasswordVisible
                      ? require('../../Assets/hide.png')
                      : require('../../Assets/show.png')
                  }
                />
              </TouchableOpacity>
              <TextInput
                secureTextEntry={isPasswordConfVisible}
                style={styles.form}
                placeholder="Password conf"
                placeholderTextColor={Colors.blackPearl}
                onChangeText={text => {
                  this.setState(prevState => {
                    let form = Object.assign({}, prevState.form);
                    form.password_confirmation = text;
                    return {form};
                  });
                }}
              />
              <TouchableOpacity
                style={styles.shown}
                onPress={this.ToggleisPasswordConfVisible}>
                <Image
                  source={
                    isPasswordConfVisible
                      ? require('../../Assets/hide.png')
                      : require('../../Assets/show.png')
                  }
                />
              </TouchableOpacity>
            </View>
            <View style={styles.errss}>
              {errors ? <Text>{errors}</Text> : null}
            </View>
            <TouchableOpacity
              style={styles.buttonDark}
              onPress={this.handleSubmit}>
              <Text style={styles.buttonDarkText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.zircon,
    paddingTop: '32%',
    paddingBottom: '40%',
    width: '100%',
    height: 900,
  },
  errss: {
    width: '50%',
    zIndex: 1,
    color: '#8B0000',
    marginTop: 5,
    marginLeft: 1,
  },
  shown: {
    marginLeft: 220,
    marginTop: -65,
    marginBottom: 45,
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

  title: {
    marginTop: '-25%',
    marginBottom: '10%',
    alignSelf: 'center',
    color: Colors.charade,
    fontWeight: 'bold',
  },

  formShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    marginTop: -30,
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    backgroundColor: Colors.white,
    width: 261,
    height: '95%',
    borderRadius: 15,
    alignSelf: 'center',
  },

  inputContainer: {
    paddingTop: 130,
    alignSelf: 'center',
  },

  form: {
    paddingHorizontal: 20,
    color: Colors.blackPearl,
    borderColor: Colors.blackPearl,
    borderWidth: 1,
    marginBottom: 30,
    width: 190,
    textAlign: 'center',
    alignSelf: 'center',
    borderRadius: 15,
  },

  buttonDark: {
    width: 193,
    padding: 15,
    marginTop: 545,
    borderRadius: 15,
    backgroundColor: Colors.blackPearl,
    borderColor: Colors.blackPearl,
    borderWidth: 1,
    alignSelf: 'center',
    zIndex: 5,
    position: 'absolute',
  },

  buttonDarkText: {
    textAlign: 'center',

    paddingHorizontal: 25,
    color: Colors.white,
  },
});

export default Signup;
