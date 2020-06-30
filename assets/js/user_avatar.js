$(function () {
    layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

$('#shangchuan').on('click', function () {
    $('#file').click()
})

    //更换裁剪区域的图片
    $('#file').on('change', function (e) {
        // 获取用户选择的文件
        var filelist = e.target.files
        // 判断是否选择图片
        if (filelist.length === 0) {
            return layer.msg('请选择图片')
        }

        // 拿到用户选择的文件
        var file = e.target.files[0]
        // 将文件转为对象
        var imgurl = URL.createObjectURL(file)
        
        // 重新初始化裁剪区域
        $image.cropper('destroy')  //销毁旧的裁剪区域
            .attr('src', imgurl)   //重新设置图片路径
        .cropper(options)          //重新初始化裁剪区域
    })

   
   
    $('#qd').on('click', function () {
        var dataURL = $image
        .cropper('getCroppedCanvas', {
          // 创建一个 Canvas 画布
          width: 100,
          height: 100
        })
            .toDataURL('image/png')

         
    $.ajax({
        type: 'post',
        url: '/my/update/avatar',
        data: {
            avatar: dataURL,
        },
        success: function (res) {
            if (res.status !==0 ) {
               return layer.msg('更换成功失败')
           }
            layer.msg('更换头像成功')
            window.parent.getUserInfo()
        }
    })
    })
}) 