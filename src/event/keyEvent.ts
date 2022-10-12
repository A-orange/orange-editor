import {ref, watch} from "vue";
// 按键按下 code
export const keyDownCode = ref<Array<string>>([]);

export const keyDownListener = () => {
  window.addEventListener('keydown', ({key}) => {
    const idx = keyDownCode.value.indexOf(key);
    if (idx === -1) {
      keyDownCode.value.push(key);
    }
  })
  window.addEventListener('keyup', ({key}) => {
    const idx = keyDownCode.value.indexOf(key);
    if (idx !== -1) {
      keyDownCode.value.splice(idx, 1);
    }
  })
}

// watch(
//   () => keyDownCode.value,
//   (keyCode) => {
//     console.log(keyCode)
//   },
//   {
//     deep: true
//   }
// )