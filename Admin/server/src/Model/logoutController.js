function logout(req, res) {
    res.clearCookie('admin_token', { path: '/' });
    res.clearCookie('AdminloggedIn', { path: '/' });
    res.send('Logout successful');
  }
  
  module.exports = { logout };
  