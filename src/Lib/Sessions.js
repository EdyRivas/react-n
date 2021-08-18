import URLS from './Url';
import Storage from './Storage';

class UserSession {
  static instance = new UserSession();

  login = async body => {
    /*     body = JSON.stringify(body);
    console.log(body) */
    try {
      let request = await fetch(
        `https://django-last-prjct.herokuapp.com/users/login/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(body),
        },
      );
      let response = await request.json();
      try {
        let key = `token-${response.user.username}`;
        await Storage.instance.store(key, response.token);
        key = `id-${response.user.username}`;
        await Storage.instance.store(key, JSON.stringify(response.user));
        return true;
      } catch (err) {
        return response;
      }
    } catch (err) {
      console.log('Login err', err);
      throw Error(err);
    }
  };

  logout = async () => {
    try {
      const allkeys = await Storage.instance.getAllKeys();
      const tokens = allkeys.filter(key => key.includes('token-'));
      await Storage.instance.multiRemove(tokens);
      const ids = allkeys.filter(key => key.includes('id-'));
      await Storage.instance.multiRemove(ids);
      return true;
    } catch (err) {
      console.log('logout err', err);
      return false;
    }
  };

  signup = async body => {
    try {
      let request = await fetch(
        `https://django-last-prjct.herokuapp.com/users/signup/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(body),
        },
      );
      let response = await request.json();
      if (typeof response.username === 'string') {
        return response.username;
      } else {
        return response;
      }
    } catch (err) {
      console.log('signup err', err);
      throw Error(err);
    }
  };

  getUser = async () => {
    try {
      const allkeys = await Storage.instance.getAllKeys();
      const data = allkeys.filter(key => key.includes('id-'));
      const user = await Storage.instance.get(data.toString());
      return JSON.parse(user);
    } catch (err) {
      console.log('Get user err', err);
    }
  };

  getToken = async username => {
    try {
      const key = `token-${username}`;
      return await Storage.instance.get(key);
    } catch (err) {
      console.log('get token err', err);
    }
  };
  editProfile = async (id, token, body) => {
    let uploadData = new FormData()
    uploadData.append('profile.picture',{
      type:'image/jpeg',
      uri: body,
      name: 'profile.jpg'
    })
    try {
      let request = await fetch(
        `https://django-last-prjct.herokuapp.com/profile/${id}/`,
        {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Token ${token}`,
          },
          body: uploadData,
        });
      let response = await request.json();
      return response;
    } catch (err) {
      console.log('edit picture err', err);
    }
  };
}
export default UserSession;
