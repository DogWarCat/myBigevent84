var user = {
  /**
   * 管理员登陆
   * @param {*} userName 用户名
   * @param {*} password 密码
   * @param {*} callBack 回调函数
   */
  login: function(userName, password, callBack) {
    // alert(userName + password);
    $.post(URLIST.user_login, { user_name: userName, password: password }, function(res) {
      // res 是本次请求，从服务器回来的数据
      callBack(res);
    });
  },

  logout: function(callBack) {
    $.post(URLIST.user_logout, function(res) {
      callBack(res);
    });
  },

  getInfo: function(callBack) {
    $.get(URLIST.user_info, function(res) {
      callBack(res);
    });
  }
};
