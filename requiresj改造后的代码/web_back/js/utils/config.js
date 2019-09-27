define(function() {
  var BASE_URL = 'http://localhost:8000';
  var URLIST = {
    user_login: BASE_URL + '/admin/login',
    user_logout: BASE_URL + '/admin/logout',
    user_getInfo: BASE_URL + '/admin/getuser',
    user_editInfo: BASE_URL + '/admin/userinfo_edit',

    category_show: BASE_URL + '/admin/category_search',
    category_add: BASE_URL + '/admin/category_add',
    category_delete: BASE_URL + '/admin/category_delete',
    category_edit: BASE_URL + '/admin/category_edit',

    article_show: BASE_URL + '/admin/search',
    article_delete: BASE_URL + '/admin/article_delete',
    article_add: BASE_URL + '/admin/article_publish',
    article_edit: BASE_URL + '/admin/article_edit'
  };

  return URLIST;
});
