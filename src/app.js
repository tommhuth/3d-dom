import "../assets/styles/app.scss"

import React from "react"
import ReactDOM from "react-dom"
import { Vector3 } from "three"
import { Canvas, useThree, useFrame } from "react-three-fiber" 
import { Router, Link } from "@reach/router"
import useStore from "./store"
import WebglImage from "./WebglImage"
import Home from "./pages/Home"
import About from "./pages/About"

// might be neccessary to not allow scroll restore?
window.history.scrollRestoration = "manual"

function App() {
    let images = useStore(i => i.images) 

    return (
        <>
            <Router primary={false}>
                <Home default />
                <About path="about" />
            </Router>
           
            <Canvas
                colorManagement
                noEvents
                style={{
                    width: "100vw",
                    height: "100vh",
                    position: "fixed",
                    top: 0,
                    zIndex: 0,
                    left: 0,
                }}
                camera={{
                    position: new Vector3(0, 0, 5),
                    near: .01,
                    far: 100
                }}
            >

                {images.map(i => <WebglImage key={i.id} {...i} />)}
            </Canvas>
        </>
    )
}


ReactDOM.render(
    <>
        <App />
    </>,
    document.getElementById("root")
) 