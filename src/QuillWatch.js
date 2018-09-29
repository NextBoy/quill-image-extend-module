import {imgHandler} from './imgHandler'
/**
 *@description 观察者模式 全局监听富文本编辑器
 */
export const QuillWatch = {
    watcher: {},  // 登记编辑器信息
    active: null,  // 当前触发的编辑器
    on: function(imageExtendId, ImageExtend) {  // 登记注册使用了ImageEXtend的编辑器
        if (!this.watcher[imageExtendId]) {
            this.watcher[imageExtendId] = ImageExtend
        }
    },
    emit: function(activeId) {  // 事件发射触发
        imgHandler()
        this.active = this.watcher[activeId]
    }
}