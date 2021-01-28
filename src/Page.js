import React, { useRef ,useState ,useEffect } from "react"
import useAnimationFrame from "use-animation-frame"
import Scroller from "./Scroller"

export default function Page({ children }) {
    let ref = useRef()
    let [contentHeight, setContentHeight] = useState(0)

    useAnimationFrame(() => {
        ref.current.style.transform = `translateY(-${Scroller.position.toFixed(1)}px)`
    })

    useEffect(()=> {
        let observer = new ResizeObserver(()=> {
            setContentHeight(ref.current.offsetHeight)
        })

        observer.observe(ref.current, { attributes: false, childList: true, subtree: true })  
    }, [])

    return (
        <>
            <div
                ref={ref}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    overflow: "hidden",
                    //background: "red",
                    zIndex: 1
                }}
            >
                <div className="container">
                    {children}
                </div>
            </div>
            <div style={{ height: contentHeight }} />
        </>
    )
}