import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../Res/Colors';
import Http from '../../Lib/Http';

class BadgesEdit extends React.Component {
  state = {
    loading: false,
    badge: {},
    form: {},
  };

  componentDidMount() {
    this.getBadge();
  }

  getBadge = () => {
    //here we get the badge by calling it as an item 
    //using a route.param and show the badge's name
    const {item} = this.props.route.params;
    this.setState({badge: item});
    this.props.navigation.setOptions({title: `${item.name}`});
  };

  handleSubmit = async () => {
    //the data that the user had insertes is saved and the user
    //is redirected to the badges screen 
    await Http.instance.put(this.state.badge._id, this.state.form);
    this.props.navigation.replace('Badges');
  };

  render() {
    const {badge, loading} = this.state;

    if (loading === true) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator
            style={styles.loader}
            color="#43FF0D"
            size="large"
          />
        </View>
      );
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Image
            style={styles.header}
            source={{uri: `${badge.Header_P}`}}
          />
          <Image
            style={styles.profileImage}
            source={{uri: `${badge.picture}`}}
          />
           <View style={styles.form}>
            <Text style={styles.inputText}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder={`${badge.name}`}
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.name = text;
                  return {form};
                });
              }}
            />
            <Text style={styles.inputText}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder={`${badge.age}`}
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.age = text;
                  return {form};
                });
              }}
            />
            <Text style={styles.inputText}>City</Text>
            <TextInput
              style={styles.input}
              placeholder={`${badge.city}`}
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.city = text;
                  return {form};
                });
              }}
            />
            <Text style={styles.inputText}>Followers</Text>
            <TextInput
              style={styles.input}
              placeholder={`${badge.followers}` || '0'}
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.followers = text;
                  return {form};
                });
              }}
            />
            <Text style={styles.inputText}>Likes</Text>
            <TextInput
              style={styles.input}
              placeholder={`${badge.likes}` || '0'}
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.likes = text;
                  return {form};
                });
              }}
            />
            <Text style={styles.inputText}>Posts</Text>
            <TextInput
              style={styles.input}
              placeholder={badge.posts ? `${badge.post}` : '0'}
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.post = text;
                  return {form};
                });
              }}
            />
            <TouchableOpacity style={styles.submit} onPress={this.handleSubmit}>
              <Text style={styles.submitText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.charade,
  },
  horizontal: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.zirccon,
    color:Colors.charade
  },
  content:{
    flex:1,
    margin:20,
    marginTop:45,
    width:'90%',
    height: 'auto',
    backgroundColor: Colors.white,
    borderRadius:20,
  },

  form: {
    paddingHorizontal: 20,
  },
  header: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 20,
    
  },
  profileImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 75,
    borderWidth: 3,
    borderColor: Colors.white,
    position: 'absolute',
    top: 25,
    left: '28%',
  },
  inputText: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 10,
    color:Colors.charade
  },
  submit: {
    marginVertical: 30,
    width: '30%',
    borderWidth: 1,
    borderColor: Colors.zirccon,
    borderRadius: 10,
    backgroundColor: Colors.charade,
  },
  submitText: {
    fontSize: 16,
    margin: 5,
    color: Colors.white,
    textAlign: 'center',
  },
});

export default BadgesEdit;