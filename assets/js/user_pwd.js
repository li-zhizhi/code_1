$(function () {
    form = layui.form
    layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'], 
        samePwd: function (value) {           
            if (value === $('#mima').val()) {
                return '新旧密码不能相同'
            }
        },
        oldPwd: function (value) {
            if (value !== $('#xinmima').val()) {
                return '两次密码不一致'
            }
        }
    })

    // 发起请求实现重置密码的功能
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/my/updatepwd',
            type: 'post',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                   return layer.msg('密码更改失败')
               }
                layer.msg('密码更改成功')
                
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})