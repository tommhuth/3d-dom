import "../assets/styles/app.scss"

import React, { useEffect, useMemo, useRef, useState } from "react"
import create from "zustand"
import ReactDOM from "react-dom"
import { Vector3, TextureLoader } from "three"
import { Canvas, useThree, useFrame } from "react-three-fiber"
import vertexShader from "./wave.vert"
import fragmentShader from "./wave.frag"

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


function getObject(size, camera, destination, z) {
    let distance = camera.position.z - z
    let vFov = camera.fov * Math.PI / 180
    let height = 2 * Math.tan(vFov / 2) * distance
    let width = height * camera.aspect
    let ratio = width / window.innerWidth

    return {
        width: ratio * size[0],
        height: ratio * size[1],
        position: [
            -width / 2 + (ratio * size[0]) / 2 + destination[0] * ratio,
            height / 2 - (ratio * size[1]) / 2 - destination[1] * ratio,
            0
        ],
        baseY: height / 2 - (ratio * size[1]) / 2 - destination[1] * ratio,
        ratio
    }
}

function Only(props) {
    return props.if ? <>{props.children}</> : null
}

function WebglImage({
    width = 200,
    height = 200,
    url,
    x = 0,
    y = 0,
    z = 0,
}) {
    let { camera } = useThree()
    let ref = useRef()
    let obj = getObject([width, height], camera, [x, y], z)
    let texture = useMemo(() => {
        return new TextureLoader().load(url)
    })
    let uniforms = useMemo(() => {
        return {
            uTime: { value: 0.0 },
            uTexture: { value: texture },
        }
    }, [])

    useEffect(() => {
        let onScroll = () => {
            ref.current.position.x = obj.position[0]
            ref.current.position.y = obj.position[1] + window.scrollY * obj.ratio
        }

        window.addEventListener("scroll", onScroll)

        onScroll()

        return () => {
            window.removeEventListener("scroll", onScroll)
        }
    }, [obj])

    useFrame(() => {
        uniforms.uTime.value += .01
    })

    return (
        <mesh
            ref={ref}
            position={[
                obj.position[0],
                obj.position[1] + window.scrollY * obj.ratio,
                obj.position[2]
            ]}
        >
            <planeBufferGeometry args={[obj.width, obj.height, 32, 32]} />
            <rawShaderMaterial
                args={[{
                    vertexShader,
                    fragmentShader,
                    uniforms,
                    wireframe: true,
                }]}
            />
        </mesh>
    )
}

function SyncedDom({ url, width, height }) {
    let ref = useRef()
    let addImage = useStore(i => i.addImage)
    let updateImage = useStore(i => i.updateImage)
    let removeImage = useStore(i => i.removeImage)

    useEffect(() => {
        let rect = ref.current.getBoundingClientRect()
        let id = addImage(url, rect.width, rect.height, rect.x, rect.y + window.scrollY)
        let tid
        let update = () => {
            let rect = ref.current.getBoundingClientRect()

            updateImage(id, url, rect.width, rect.height, rect.x, rect.y + window.scrollY)
        }
        let onResize = () => {
            clearTimeout(tid)

            tid = setTimeout(update, 25)
        }
        let observer1 = new MutationObserver(update)
        let observer2 = new ResizeObserver(update)

        observer1.observe(document.body, { attributes: true, childList: true, subtree: true }) 
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

function App() {
    let images = useStore(i => i.images)
    let [toggle, setToggle] = useState(false)

    return (
        <>
            <div
                className="container"
                style={{
                    position: "relative",
                    zIndex: 1
                }}
            >
                <h1>Attempt at basic Webgl and DOM syncing</h1>
                <p>Etiam in efficitur nulla, in porta diam. Aliquam ac orci dapibus, accumsan massa sed, facilisis lacus. Donec vel mattis nisi. Curabitur consequat lacinia eros, ac tristique nisl volutpat id. Phasellus sed neque eget quam tincidunt vulputate a et tellus. Mauris tincidunt tempus turpis, eu viverra metus vehicula pharetra. Nulla purus mauris, eleifend a massa sit amet, laoreet viverra mauris. Morbi gravida egestas gravida. Nullam tempor nunc vel ligula varius, sed fermentum quam rhoncus. Sed nec justo ac velit ultricies semper vitae quis risus.</p>
                <p>Etiam in efficitur nulla, in porta diam. Aliquam ac orci dapibus, accumsan massa sed, facilisis lacus. Donec vel mattis nisi. Curabitur consequat lacinia eros, ac tristique nisl volutpat id. Phasellus sed neque eget quam tincidunt vulputate a et tellus. Mauris tincidunt tempus turpis, eu viverra metus vehicula pharetra. Nulla purus mauris, eleifend a massa sit amet, laoreet viverra mauris. Morbi gravida egestas gravida. Nullam tempor nunc vel ligula varius, sed fermentum quam rhoncus. Sed nec justo ac velit ultricies semper vitae quis risus.</p>
                <p>Etiam in efficitur nulla, in porta diam. Aliquam ac orci dapibus, accumsan massa sed, facilisis lacus. Donec vel mattis nisi. Curabitur consequat lacinia eros, ac tristique nisl volutpat id. Phasellus sed neque eget quam tincidunt vulputate a et tellus. Mauris tincidunt tempus turpis, eu viverra metus vehicula pharetra. Nulla purus mauris, eleifend a massa sit amet, laoreet viverra mauris. Morbi gravida egestas gravida. Nullam tempor nunc vel ligula varius, sed fermentum quam rhoncus. Sed nec justo ac velit ultricies semper vitae quis risus.</p>

                <SyncedDom
                    url="https://images.unsplash.com/photo-1562639410-3f9ff4e00b15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80&h=1000"
                    width={500}
                    height={400}
                />

                <ul>
                    <li>
                        <SyncedDom
                            height={240}
                            url="https://images.unsplash.com/photo-1604960324271-81e29f5e129b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80&h=600"
                        />
                    </li>
                    <li>
                        <SyncedDom
                            height={240}
                            url="https://images.unsplash.com/photo-1604960324271-81e29f5e129b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80&h=600"
                        />
                    </li>
                    <li>
                        <SyncedDom
                            height={240}
                            url="https://images.unsplash.com/photo-1604960324271-81e29f5e129b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80&h=600"
                        />
                    </li>
                </ul>

                <p>Etiam in efficitur nulla, in porta diam. Aliquam ac orci dapibus, accumsan massa sed, facilisis lacus. Donec vel mattis nisi. Curabitur consequat lacinia eros, ac tristique nisl volutpat id. Phasellus sed neque eget quam tincidunt vulputate a et tellus. Mauris tincidunt tempus turpis, eu viverra metus vehicula pharetra. Nulla purus mauris, eleifend a massa sit amet, laoreet viverra mauris. Morbi gravida egestas gravida. Nullam tempor nunc vel ligula varius, sed fermentum quam rhoncus. Sed nec justo ac velit ultricies semper vitae quis risus.</p>

                <div style={{ maxWidth: "65%", margin: "0 0 0 auto" }}>
                    <SyncedDom
                        height={400}
                        url="https://images.unsplash.com/photo-1605014093414-29b156556886?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2167&q=80"
                    />
                </div>

                <h2> Aliquam ac orci dapibus</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dui purus, egestas ac mattis id, congue quis elit. Nulla orci velit, semper nec cursus ut, bibendum sit amet turpis. Vestibulum et enim ut leo venenatis accumsan. Integer non sodales ante. Aliquam iaculis leo sed dictum mollis. Nam faucibus hendrerit dui et facilisis. Aenean eget pellentesque risus. Nulla facilisi. Nunc lobortis, turpis ullamcorper cursus rhoncus, est velit pharetra elit, quis fermentum odio diam a tellus. Integer ac sem sem. Suspendisse dui arcu, finibus eget justo ut, venenatis lobortis lorem. Nullam interdum orci id erat elementum, non egestas ante cursus. Nullam in suscipit velit, sit amet dapibus mauris. Sed finibus condimentum ex in suscipit. Nunc ut posuere velit. Mauris pharetra tempus ex a convallis.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dui purus, egestas ac mattis id, congue quis elit. Nulla orci velit, semper nec cursus ut, bibendum sit amet turpis. Vestibulum et enim ut leo venenatis accumsan. Integer non sodales ante. Aliquam iaculis leo sed dictum mollis. Nam faucibus hendrerit dui et facilisis. Aenean eget pellentesque risus. Nulla facilisi. Nunc lobortis, turpis ullamcorper cursus rhoncus, est velit pharetra elit, quis fermentum odio diam a tellus. Integer ac sem sem. Suspendisse dui arcu, finibus eget justo ut, venenatis lobortis lorem. Nullam interdum orci id erat elementum, non egestas ante cursus. Nullam in suscipit velit, sit amet dapibus mauris. Sed finibus condimentum ex in suscipit. Nunc ut posuere velit. Mauris pharetra tempus ex a convallis.</p>

                <SyncedDom
                    url="https://images.unsplash.com/photo-1560400615-79776f7438e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1275&q=80&h=400"
                    height={350}
                />

                <h2>Xonsectetur adipiscing eliquam ac orci dapibus</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dui purus, egestas ac mattis id, congue quis elit. Nulla orci velit, semper nec cursus ut, bibendum sit amet turpis. Vestibulum et enim ut leo venenatis accumsan. Integer non sodales ante. Aliquam iaculis leo sed dictum mollis. Nam faucibus hendrerit dui et facilisis. Aenean eget pellentesque risus. Nulla facilisi. Nunc lobortis, turpis ullamcorper cursus rhoncus, est velit pharetra elit, quis fermentum odio diam a tellus. Integer ac sem sem. Suspendisse dui arcu, finibus eget justo ut, venenatis lobortis lorem. Nullam interdum orci id erat elementum, non egestas ante cursus. Nullam in suscipit velit, sit amet dapibus mauris. Sed finibus condimentum ex in suscipit. Nunc ut posuere velit. Mauris pharetra tempus ex a convallis.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dui purus, egestas ac mattis id, congue quis elit. Nulla orci velit, semper nec cursus ut, bibendum sit amet turpis. Vestibulum et enim ut leo venenatis accumsan. Integer non sodales ante. Aliquam iaculis leo sed dictum mollis. Nam faucibus hendrerit dui et facilisis. Aenean eget pellentesque risus. Nulla facilisi. Nunc lobortis, turpis ullamcorper cursus rhoncus, est velit pharetra elit, quis fermentum odio diam a tellus. Integer ac sem sem. Suspendisse dui arcu, finibus eget justo ut, venenatis lobortis lorem. Nullam interdum orci id erat elementum, non egestas ante cursus. Nullam in suscipit velit, sit amet dapibus mauris. Sed finibus condimentum ex in suscipit. Nunc ut posuere velit. Mauris pharetra tempus ex a convallis.</p>
                
                <button onClick={()=> setToggle(prev => !prev)}>Toggle me</button>

                <Only if={toggle}> 
                    <SyncedDom
                        url="https://images.unsplash.com/photo-1560400615-79776f7438e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1275&q=80&h=400"
                        height={350}
                    />
                </Only>

                <h2>Consectetur adipiscing elit, egestas ac mattis id, congue quis elvamus dui pu adipiscing eliquam Vivamus orci dapibus</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dui purus, egestas ac mattis id, congue quis elit. Nulla orci velit, semper nec cursus ut, bibendum sit amet turpis. Vestibulum et enim ut leo venenatis accumsan. Integer non sodales ante. Aliquam iaculis leo sed dictum mollis. Nam faucibus hendrerit dui et facilisis. Aenean eget pellentesque risus. Nulla facilisi. Nunc lobortis, turpis ullamcorper cursus rhoncus, est velit pharetra elit, quis fermentum odio diam a tellus. Integer ac sem sem. Suspendisse dui arcu, finibus eget justo ut, venenatis lobortis lorem. Nullam interdum orci id erat elementum, non egestas ante cursus. Nullam in suscipit velit, sit amet dapibus mauris. Sed finibus condimentum ex in suscipit. Nunc ut posuere velit. Mauris pharetra tempus ex a convallis.</p>
            </div>

            <SyncedDom
                height={500}
                url="https://images.unsplash.com/photo-1603139875501-8c965c19e10d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80&h=500"
            />

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