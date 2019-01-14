/*
  Para testear usar json-server:
  json-server --watch db.json --port 3004
  ----------------------------------------------------
  Server Interface
  https://git.theamalgama.com/insignary/insignary-ws/wikis/home
*/

import 'whatwg-fetch'


/**
 *  Make a request
 * 
 * @param {string} url
 * @param {object} options
 * @returns Promise 
 * 
 */
function request(url, options, urlAbsolute) {
  var server = '//insignary-api.theamalgama.com'

  function parseJSON(response) {
    return response.json()
  }

  return new Promise((resolve) => {
    
    if(!urlAbsolute) {
      url = server + url;
    }

    fetch(url, options)
      .then(parseJSON)
      .then((data) => {
        resolve(data)
      })
  })
}

const api = {

  getUserById: function (id) {
    return request('/users/' + id)
  },

  getResults: function () {
    
    return request('/1/results')
  },

  getResultsById: function (id) {
    return request('/results/' + id)
  },

  setUser: function (data) {

    const defaults = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    return request('/1/users', Object.assign(defaults, { body: JSON.stringify(data) }))

  },

  getLogin: function (data) {
    const defaults = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    return request('/oauth/token', Object.assign(defaults, { body: JSON.stringify(data) }))
  },

  getUserProfile: function (token) {
    const defaults = {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    return request('/1/users/me', defaults)
  },

  setUserProfile: function (token,data) {
    const defaults = {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    return request('/1/users/me/profile',  Object.assign(defaults, { body:data }))
  },

  getUploadFile: function (token, data) {
    const defaults = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };
    return request('/1/reports/', Object.assign(defaults, { body:data }))    
  },

  getScannedReports: function (token) {
    const defaults = {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    return request('/1/reports', defaults)
  },


  refreshToken: function (token) {
    console.log('refresh token');
    const defaults = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ grant_type: "refresh_token", refresh_token: token })
    }
    return request('/oauth/token', defaults)

    },

    getTreeScannedReport: function (token,idReport) {
      const defaults = {
        headers: {
          'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
      };

      return request('/1/reports/'+idReport+'/tree', defaults)
    },


    getResultsByReport: function (token,idReport) {
      const defaults = {
        headers: {
          'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
      };

      return request('http://localhost:3000/result.json', defaults, true)
    
    },

  }


export default api