import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Colors from '../../Res/Colors';
import Storage from '../../Lib/Storage';

class BadgesDetail extends React.Component {
  state = {
    badge: {},
    isFavorite: false,
  };
  
  componentDidMount() {
    this.getBadge();
  }

  getBadge = () => {
    //here we get the badge as an item and check if it is favorite
    //to mark the heart and show its name 
    const {item} = this.props.route.params;
    this.setState({badge: item}, () => {
      this.getFavorite();
    });
    this.props.navigation.setOptions({title: item.name});
  };

  getFavorite = async () => {
    //here we obtain the badges id from the badges info
    //then get the key that is in the storage
    //and set a state to true
    try {
      const key = `favorite-${this.state.badge._id}`;
      const favoriteStr = await Storage.instance.get(key);
      if (favoriteStr != null) {
        this.setState({isFavorite: true});
      }
    } catch (err) {
      console.log('Get favorite err', err);
    }
  };

  toggleFavorite = () => {
    //is the state is true the badge will be at 
    //favorites and if it is false, it wont be there
    if (this.state.isFavorite) {
      this.removeFavorite();
    } else {
      this.addFavorite();
    }
  };
  addFavorite = async () => {
    //here we get the badhes data, then save the id
    //then save the id with the badges data
    //afther that if te info was stored the badge will be favorite
    const badge = JSON.stringify(this.state.badge);
    const key = `favorite-${this.state.badge._id}`;
    const stored = await Storage.instance.store(key, badge);
    if (stored) {
      this.setState({isFavorite: true});
    }
  };  
  removeFavorite = async () => {
    //we get the badges id then the badge with that id 
    //will be deleted because it was deleted, its state will be false
    const key = `favorite-${this.state.badge._id}`;
    await Storage.instance.remove(key);
    this.setState({isFavorite: false});
  };
  render() {
    const {badge, isFavorite} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.badge}>
          <Image style={styles.header} source={{uri: `${badge.Header_P}`}} />
          <Image style={styles.profileImg} source={{uri: `${badge.picture}`}} />
          <TouchableOpacity
           
            onPress={this.toggleFavorite}>
            <Image
              source={
                isFavorite
                  ? require('../../Assets/isFavorite.png')
                  : require('../../Assets/notFavorite.png')
              }
            />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <Text style={styles.name}>{badge.name}</Text>
            <Text style={styles.age}>{badge.age}</Text>
          </View>
          <Text style={styles.city}>{badge.city}</Text>
          <View style={styles.data}>
            <View style={styles.dataColumns}>
              <Text style={styles.dataInfo}>{badge.followers || '0'} </Text>
              <Text style={styles.smallText}>followers</Text>
            </View>
            <View style={styles.dataColumns}>
              <Text style={styles.dataInfo}>{badge.likes || '0'}</Text>
              <Text style={styles.smallText}>Likes</Text>
            </View>
            <View style={styles.dataColumns}>
              <Text style={styles.dataInfo}>{badge.post || '0'}</Text>
              <Text style={styles.smallText}>Posts</Text>
            </View>
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
  badge: {
    flex: 1,
    margin: 20,
    width: '90%',
    height: '90%',
    backgroundColor: Colors.white,
    borderRadius: 25,
  },
  header: {
    width: '100%',
    height: '40%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  profileImg: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 100,
    borderWidth: 5,
    borderColor: Colors.white,
    position: 'absolute',
    top: '23%',
    left: '20%',
  },
  userInfo: {
    flexDirection: 'row',
    marginTop: 110,
    justifyContent: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.blackPearl,
  },
  age: {
    fontSize: 28,
    color: Colors.zircon,
    marginLeft: 20,
  },
  city: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
    color: Colors.zircon,
  },
  data: {
    padding: 20,
    marginTop: 50,
    justifyContent: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: Colors.zircon,
  },
  dataColumns: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataInfo: {
    marginTop: '5%',
    fontSize: 28,
    fontWeight: 'bold',
    marginHorizontal: 25,
    color: Colors.charade,
  },
  smallText: {
    color: Colors.zircon,
  },
  favorite: {
    width: 49,
    height: 49,
    position: 'absolute',
    top: 29,
    right: 40,
  },
});
export default BadgesDetail;
