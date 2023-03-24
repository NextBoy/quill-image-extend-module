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
              useCustomUpload: true,  // 可选参数 是否使用自定义上传，如果为true，则不会使用quill自带的上传方法
              customUploadHandler: (file) => { // 可选参数 自定义上传方法，如果useCustomUpload为true，则必须设置此参数
                // file为上传的图片文件
                // 在此处可以使用axios等方法上传图片
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
