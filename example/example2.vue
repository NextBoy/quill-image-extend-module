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
