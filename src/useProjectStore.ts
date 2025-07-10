import { defineStore } from "pinia";

export const useProjectStore = defineStore('projectStore', {
    state: ()=>({
        insets: {
            width: 0,
            height: 0
        } as {
            width: number,
            height: number
        },
        lastZIndex: 1 // 最后一个 FloatingPanel 的 zIndex，每点一次，+1
    }),
    getters: {

    },
    actions: {

    }
})


