import * as rp from 'request-promise';

class Auth {

  async authenticate(user, pass, session, callback) {

    let options = {
      method: 'POST',
      uri: 'https://auth.docsoc.co.uk/authorize',
      body: {
        "user": user,
        "pass": pass
      },
      json: true
    }

    try {
      let parsedBody = await rp(options)
      if (parsedBody.auth) {
        if (parsedBody.membership) {
          logger.info('User ' + user + ' successfully logged in')
          // setup session
          session.docsoc = false
          session.login = true
          session.type = 'member'
          session.data = parsedBody.data
          session.user = user
          callback(true)
        } else {
          logger.info('User ' + user + ' not DoCSoc member')
          callback({
            member: true,
            err: 'Not a DoCSoc Member'
          })
        }
      } else {
        logger.info('User ' + user + ' failed logged in')
        callback({
          member: true,
          err: 'Wrong Username or Password'
        })
      }
    } catch(err) {
      callback({
        member: true,
        err: 'Authentication server down. Try again later'
      })
    }


  }
}

export default Auth;
