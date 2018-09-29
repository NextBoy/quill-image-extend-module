import {QuillWatch} from 'QuillWatch'
/**
 * @description 点击图片上传
 */
export function imgHandler() {
    let fileInput = document.querySelector('.quill-image-input');
    if (fileInput === null) {
        fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.classList.add('quill-image-input');
        fileInput.style.display = 'none'
        // 监听选择文件
        fileInput.addEventListener('change', function () {
            let self = QuillWatch.active
            self.file = fileInput.files[0]
            fileInput.value = ''
            // 如果图片限制大小
            if (self.config.size && self.file.size >= self.config.size * 1024 * 1024 && self.config.loading) {
                self.quillLoading.classList.remove('extend-upload-success')
                self.quillLoading.classList.add('extend-upload-warning-color')
                self.quillLoading.innerHTML = '图片大小超过限制'
                setTimeout(function () {
                    self.quillLoading.classList.remove('extend-upload-warning-color')
                    self.quillLoading.classList.add('extend-upload-success')
                }, 1500)
                return
            }
            if (self.config.action) {
                self.uploadImg(self.config.change)
            } else {
                self.toBase64()
            }
        })
        document.body.appendChild(fileInput);
    }
    fileInput.click();
}
