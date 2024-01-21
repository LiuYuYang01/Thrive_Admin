// 封装是否删除确认对话框
export function whetherDelete(cb: () => {}, text: string) {
    ElMessageBox.confirm(
        `你确定要删除该${text}吗`,
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
        }
    )
        .then(() => {
            cb()
        })
}

// 封装loading加载效果
export const svg =  `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `