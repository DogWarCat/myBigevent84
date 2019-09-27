require.config({
  paths: {
    jquery: '../lib/jquery-1.12.4.min',
    template: '../lib/template-web',
    bootstrap: '../bootstrap/js/bootstrap.min',
    category: '../utils/category',
    config: '../utils/config'
  }
});

require(['jquery', 'template', 'bootstrap', 'category'], function($, template, bootstrap, category) {
  function doQuery() {
    category.show(function(res) {
      if (res.code === 200) {
        // 要把 res.data 转成表格中的行
        // 1. 循环 + 字符串拼接
        // 2. 模板引擎
        var htmlStr = template('tmp', res);
        $('#tableContent').html(htmlStr);
      }
    });
  }

  function deleteTr(id) {
    // id:要删除的类型的id
    if (window.confirm('你要删除吗？')) {
      // alert(id);
      category.del(id, function(res) {
        if (res.code === 200) {
          doQuery();
        }
      });
    }
  }
  window.deleteTr = deleteTr;

  $(function() {
    // $('#addModal').modal({
    //   show: false,
    //   backdrop: false
    // });

    $('#model_shutoff').click(function() {
      $('#addModal').modal('hide');
    });

    doQuery();

    // 显示新增模态框
    $('#showAddModel').click(function() {
      $('#model_edit').hide(); // 隐藏 编辑
      $('#model_add').show(); //
      $('#addModal .modal-title').html('新增分类');

      $('#categoryName').val('');
      $('#categorySlug').val('');
      $('#divResult').hide();
    });

    // 编辑
    // 第一步：显示之前的信息
    // 第二步：用户修改并保存
    $('.category_table').on('click', 'a', function() {
      if ($(this).hasClass('btn-info')) {
        var id = $(this).attr('data-id');
        var name = $(this).attr('data-name');
        var slug = $(this).attr('data-slug');

        $('#categoryName').val(name);
        $('#categorySlug').val(slug);
        $('#categoryId').val(id);

        $('#divResult')
          .text('')
          .hide();

        $('#addModal .modal-title').html('修改分类名称');
        $('#addModal').modal('show');

        $('#model_add').hide(); // 隐藏添加
        $('#model_edit').show();
      }
    });

    // 执行编辑操作
    $('#model_edit').click(function() {
      // 1. 获取用户的输入，简单判断
      var name = $('#categoryName').val();
      var slug = $('#categorySlug').val();

      // 从隐藏域中取出
      var id = $('#categoryId').val();

      if (name === '' || slug === '') {
        $('#divResult').text('分类名和别名不能为空！');
        return;
      }

      category.edit(id, name, slug, function(res) {
        if (res.code === 200) {
          // 隐藏模态框
          $('#addModal').modal('hide');
          // 清空提示
          $('#divResult').text('');
          // 重新求数据
          doQuery();
        }
      });
    });

    // 执行添加操作
    $('#model_add').click(function() {
      // 1. 获取用户的输入，简单判断
      var name = $('#categoryName').val();
      var slug = $('#categorySlug').val();
      if (name === '' || slug === '') {
        $('#divResult').text('分类名和别名不能为空！');
        return;
      }

      // 2. 调用方法
      category.add(name, slug, function(res) {
        if (res.code === 200) {
          // 隐藏模态框
          $('#addModal').modal('hide');
          // 清空提示
          $('#divResult').text('');
          // 重新求数据
          doQuery();
        } else {
          $('#divResult')
            .show()
            .text(res.msg);
        }
      });
    });
  });
});
