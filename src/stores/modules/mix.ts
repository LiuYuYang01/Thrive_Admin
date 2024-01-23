import { defineStore } from 'pinia'

export const useMixStore = defineStore("mix", () => {
    const tagPageName = ref<string>("")

    return { tagPageName }
})