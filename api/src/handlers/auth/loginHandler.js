

const ValidateUser = async (req, res) => {
  // la info la creo en serializeUser
  console.log(req.user);
  res.status(200).json({ message: `Hello ${req.user.name}` })
  }

const LogOut = async (req, res) => {
  
    if (req.user) {
          req.logout(function (err) {
            if (err) { res.send('eroro!') }
            req.session.destroy()
            res.send('Goodbye! server ')
          })
        } else {
          res.redirect('/login')
        }
}

module.exports = {
    ValidateUser,
    LogOut
};