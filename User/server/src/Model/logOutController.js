function logout(req, res) {
  res.clearCookie('token', { path: '/' });
  res.clearCookie('loggedIn', { path: '/' });
  res.send('Logout successful');
}

module.exports = { logout };
