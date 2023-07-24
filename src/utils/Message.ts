export function whetherToDelete(cb, text) {
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