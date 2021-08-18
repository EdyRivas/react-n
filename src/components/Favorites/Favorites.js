import React from 'react';
import colors from '../../Res/Colors';
import Loader from '../Generics/Loader';
import Storage from '../../Lib/Storage';
import exampleStyles from '../../../Styles/Example';
import BadgesItem from '../BadgesScreen/BadgesItem';
import {
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';
class Favorites extends React.Component {
  state = {
    loading: false,
    badges: undefined,
  };

  
  componentDidMount = () => {
    this.getFavorites();
    this.focusEvent();
  };

  getFavorites = async () => {
    //with this event we will be calling all the favorites badges,
    //so we need a  loader to wait for the response 
    //then the key are saved and the id from the favorites badges 
    //are obtained but just the favorites are saved
    //and the loading state is cancelled
    this.setState({loading: true, badges: undefined});
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const keys = allKeys.filter(key => key.includes('favorite-'));
      const favs = await Storage.instance.multiGet(keys);
      const favorites = favs.map(fav => JSON.parse(fav[1]));
      this.setState({loading: false, badges: favorites});
    } catch (err) {
      console.log('get favorites err', err);
    }
  };

  handlePress = item => {
    //when a badge is pressed it will show its details 
    this.props.navigation.navigate('FavoritesDetails', {item});
  };

  focusEvent = () => {
    //here we obtain all the favorites 
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getFavorites();
    });
  };

  componentWillUnmount = () => {
    this.focusListener();
  };

  render() {
    const {badges, loading} = this.state;
    if (loading === true && !badges) {
      <Loader />;
    }
    return (
      <View
        style={[
          styles.favoritesContainer,
          exampleStyles.container,
          exampleStyles.horizontal,
        ]}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <FlatList
          style={styles.list}
          data={badges}
          renderItem={({item}) => (
            <BadgesItem item={item} onPress={() => this.handlePress(item)} />
          )}
          keyExtractor={(item, index) => index.toString}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  favoritesContainer: {
    paddingTop: 45,
  },
  list: {
    width: '100%',
    paddingHorizontal: 10,
  },
});
export default Favorites;
