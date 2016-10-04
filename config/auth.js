// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '224026328012784', // your App ID
        'clientSecret'  : '42c10625eb3907ccc8f0fe75466f0793', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'za6Uer31mRorflWk1BGL5PLgW',
        'consumerSecret'    : '5wd2f7v9OSHyM0ljPmhXvrFnhrf1pRB0U5BSehaanIH0WBAP6K',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '1070153332993-9mthohh5maja97q583a6k62gapgalnkr.apps.googleusercontent.com',
        'clientSecret'  : 'NVwnrD43riONe7uqUjHbWMgq',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};


224026328012784