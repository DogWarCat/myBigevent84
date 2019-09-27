define(['config'], function(URLIST) {
  var category = {
    show: function(callBack) {
      $.get(URLIST.category_show, function(res) {
        callBack(res);
      });
    },

    add: function(name, slug, callBack) {
      $.post(URLIST.category_add, { name: name, slug: slug }, function(res) {
        callBack(res);
      });
    },
    del: function(id, callBack) {
      $.post(URLIST.category_delete, { id: id }, function(res) {
        callBack(res);
      });
    },
    edit: function(id, name, slug, callBack) {
      $.post(URLIST.category_edit, { id: id, name: name, slug: slug }, function(res) {
        callBack(res);
      });
    }
  };

  return category;
});
