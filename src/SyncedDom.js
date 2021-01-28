
import React, { useEffect, useMemo, useRef, useState } from "react" 
import useStore from "./store"
import Scroller from "./Scroller"

export default function SyncedDom({ url, width, height }) {
    let ref = useRef()
    let addImage = useStore(i => i.addImage)
    let updateImage = useStore(i => i.updateImage)
    let removeImage = useStore(i => i.removeImage)

    useEffect(() => {
        let rect = ref.current.getBoundingClientRect()
        let id = addImage(url, rect.width, rect.height, rect.x, rect.y) //  + Scroller.target
        let tid
        let update = () => {
            let rect = ref.current.getBoundingClientRect()

            updateImage(id, url, rect.width, rect.height, rect.x, rect.y ) //+ Scroller.target
        }
        let onResize = () => {
            clearTimeout(tid)

            tid = setTimeout(update, 75)
        }
        let observer1 = new MutationObserver(update)
        let observer2 = new ResizeObserver(update)

        observer1.observe(document.body, { attributes: false, childList: true, subtree: true }) 
        observer2.observe(ref.current) 
        window.addEventListener("resize", onResize)

        return () => {
            window.removeEventListener("resize", onResize)
            removeImage(id)
            clearTimeout(tid)
            observer1.disconnect()
            observer2.disconnect()
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