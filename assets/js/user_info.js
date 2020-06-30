$(function () {
    var form = layui.form;
    var layer = layui.layer

  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称长度在1-6之间";
      }
    },
  });
    
    
    
  initUserInfo()
    // 获取用户的基本信息
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function (res) {
                console.log(res);
                
                if (res.status !== 0) {
                    layer.msg('获取用户信息失败')
                }
            
                form.val('formUserInfo', res.data);               
            }
        })
    }
    // 表单重置
    $('#btnReset').on('click', function (e) {
        // 阻止表单默认行为
        e.preventDefault()
        initUserInfo()
    })

    // 发起请求更新用户的信息

    $('.layui-form').on('submit', function (e) {
        // 阻止表单的默认提交行为 
        e.preventDefault() 
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !==0) {
                    return layer.msg('更新用户失败')
                }
                layer.msg('更新成功')
                 window.parent.getUserInfo() 
            }
        })
    })

});



