# quill-image-extend-module 
vue-quill-editor的增强模块，

功能：
 - 提供图片上传到服务器的功能
 - 复制插入
 - 拖拽插入
 - 显示上传进度
 - 显示上传成功或者失败
 - 支持与其他模块一起使用（例如调整图片大小）

## 更新情况
 - version 1.1
   - 增加上传显示文字样式
   - 增加图片超过自定义大小的回调 sizeError
   - 修复同一页面多个富文本编辑器上传图片只能插入第一个编辑器的bug
   - 引入QuillWatch 全局监听多个富文本编辑器

## Install
```bash
npm install quill-image-extend-module --save-dev
```
## use
```ecmascript 6
  import {quillEditor, Quill} from 'vue-quill-editor'
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

  Quill.register('modules/ImageExtend', ImageExtend)
```
## example
```ecmascript 6
<template>
  <div class="quill-wrap">
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
    >
    </quill-editor>
  </div>
</template>
<script>
  import {quillEditor, Quill} from 'vue-quill-editor'
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

  Quill.register('modules/ImageExtend', ImageExtend)
  export default {
    components: {quillEditor},
    data() {
      return {
       content: '',
        // 富文本框参数设置
        editorOption: {
          modules: {
            ImageExtend: {
              loading: true,
              name: 'img',
              action: updateUrl,
              response: (res) => {
                return res.info
              }
            },
            toolbar: {
              container: container,
              handlers: {
                'image': function () {
                  QuillWatch.emit(this.quill.id)
                }
              }
            }
          }
        }
      }
    }
  }
</script>

```
## quill-image-extend-module 的所有可配置项
```ecmascript 6
 editorOption: {
                     modules: {
                         ImageExtend: {
                             loading: true,  // 可选参数 是否显示上传进度和提示语
                             name: 'img',  // 图片参数名
                             size: 3,  // 可选参数 图片大小，单位为M，1M = 1024kb
                             action: updateUrl,  // 服务器地址, 如果action为空，则采用base64插入图片
                             // response 为一个函数用来获取服务器返回的具体图片地址
                             // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
                             // 则 return res.data.url
                             response: (res) => {
                                 return res.info
                             },
                             headers: (xhr) => {},  // 可选参数 设置请求头部
                             sizeError: () => {},  // 图片超过大小的回调
                             start: () => {},  // 可选参数 自定义开始上传触发事件
                             end: () => {},  // 可选参数 自定义上传结束触发的事件，无论成功或者失败
                             error: () => {},  // 可选参数 上传失败触发的事件
                             success: () => {},  // 可选参数  上传成功触发的事件
                             change: (xhr, formData) => {} // 可选参数 选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
                         },
                         toolbar: {
                             container: container,  // container为工具栏，此次引入了全部工具栏，也可自行配置
                             handlers: {
                                 'image': function () {  // 劫持原来的图片点击按钮事件
                                     QuillWatch.emit(this.quill.id)
                                 }
                             }
                         }
                     }
                 }
```
### 注意事项 （matters need attention）
由于不同的用户的服务器返回的数据格式不尽相同

因此
在配置中，你必须如下操作
```vue
 // 你必须把返回的数据中所包含的图片地址 return 回去
 respnse: (res) => {
    return res.info  // 这里切记要return回你的图片地址
 }
```
比如你的服务器返回的成功数据为
```vue
{
code: 200,
starus: true,
result: {
    img: 'http://placehold.it/100x100' // 服务器返回的数据中的图片的地址
 }
}
```
那么你应该在参数中写为：
```vue
 // 你必须把返回的数据中所包含的图片地址 return 回去
 respnse: (res) => {
    return res.result.img  // 这里切记要return回你的图片地址
 }
```

## 与其他模块一起使用（以resize-module为例子）
```ecmascript 6
<template>
  <div class="quill-wrap">
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
    >
    </quill-editor>
  </div>
</template>
<script>
  import {quillEditor, Quill} from 'vue-quill-editor'
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
  import ImageResize from 'quill-image-resize-module'

  Quill.register('modules/ImageExtend', ImageExtend)
  // use resize module
  Quill.register('modules/ImageResize', ImageResize)
  export default {
    components: {quillEditor},
    data() {
      return {
        content: '',
        // 富文本框参数设置
        editorOption: {
          modules: {
            ImageResize: {},
            ImageExtend: {
              loading: true,
              name: 'img',
              size: 2,  // 单位为M, 1M = 1024KB
              action: updateUrl,
              headers: (xhr) => {
              },
              response: (res) => {
                return res.info
              }
            },
            toolbar: {
              container: container,
              handlers: {
                'image': function () {
                  QuillWatch.emit(this.quill.id)
                }
              }
            }
          }
        }
      }
    }
  }
</script>

```




## (如果觉得还不错，请右上角点击下星星，此致敬礼)











