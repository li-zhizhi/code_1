$(function () {
  // 登录
  $("#link_reg").on("click", function () {
    $(".reg_box").hide();
    $(".login_box").show();
  });
  // 注册
  $("#link_login").on("click", function () {
    $(".reg_box").show();
    $(".login_box").hide();
  });

  var form = layui.form;
  var layer = layui.layer;

  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function (value) {
      let pwd = $("#password").val();
      if (pwd !== value) {
        return "新旧密码不一致";
      }
    },
  });

  // 监听注册表单的提交事件]
  $("#form_reg").submit(function (e) {
    // 1. 阻止默认的提交行为
    e.preventDefault();
    // 2. 发起Ajax的POST请求
    var data = {
      username: $("#form_reg [name=username]").val(),
      password: $("#form_reg [name=password]").val(),
    };

    $.post("/api/reguser", data, function ( res ) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      layer.msg("注册成功，请登录！");
      $("#link_reg").click();
    });
  });

  // 监听登录表单提交事件
  $('#form_login').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      data: $(this).serialize(),
      url: '/api/login',
      success: function (res) {
        if (res.status !==0) {
         return layer.msg('登陆失败')
        }
        layer.msg('登录成功')
        // 登录成功得到token,将token保存到浏览器
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })

});
