import React, { useEffect, useRef } from "react"
import useStore from "./store" 

export default function SyncedDom({ url, width, height }) {
    let ref = useRef()
    let addImage = useStore(i => i.addImage)
    let updateImage = useStore(i => i.updateImage)
    let removeImage = useStore(i => i.removeImage)

    useEffect(() => {
        let rect = ref.current.getBoundingClientRect()
        let id = addImage({
            url,
            width: rect.width,
            height: rect.height,
            x: rect.x,
            y: rect.y + window.scrollY
        }) 
        let update = () => {
            let { x, y, width, height } = ref.current.getBoundingClientRect() 

            updateImage({ id, width, height, x, y: y + window.scrollY }) 
        }
        let tid
        let onResize = () => {
            clearTimeout(tid)

            //tid = setTimeout(update, 20)
        }
        let mutations = new MutationObserver(update)
        let resizes = new ResizeObserver(update)

        mutations.observe(document.body, { attributes: false, childList: true, subtree: true })
        //resizes.observe(ref.current)
        resizes.observe(window.document.body)
        window.addEventListener("resize", onResize)

        return () => {
            removeImage(id)

            clearTimeout(tid)
            window.removeEventListener("resize", onResize)
            mutations.disconnect()
            resizes.disconnect()
        }
    }, [])

    return (
        <div
            ref={ref}
            style={{
                maxWidth: width,
                height,
                margin: "2em 0",
                //outline: "2px solid red"
            }}
        >

        </div>
    )
}