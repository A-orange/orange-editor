export function typeOf(target: any) {
    return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
}

import { ElMessage } from 'element-plus'
// 复制
export function copyToClipboard(str: string) {
  return new Promise(resolve => {
    const textarea = document.createElement('textarea');
    textarea.value = str;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('Copy');
    textarea.remove();
    ElMessage.info('复制成功');
    resolve(true);
  })
}