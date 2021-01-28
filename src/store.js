import create from "zustand"

let ids = 0

const [useStore, api] = create((set, get) => {
    return {
        images: [],
        addImage(url, width, height, x, y) {
            let id = ids++

            set({
                images: [
                    ...get().images,
                    {
                        url,
                        width,
                        height,
                        x,
                        y,
                        id
                    }
                ]
            })

            return id
        },
        updateImage(id, url, width, height, x, y) {
            set({
                images: [
                    ...get().images.filter(i => i.id !== id),
                    {
                        url,
                        width,
                        height,
                        x,
                        y,
                        id
                    }
                ]
            })
        },
        removeImage(id) {
            set({
                images: get().images.filter(i => i.id !== id)
            })
        }
    }
})

export default useStore