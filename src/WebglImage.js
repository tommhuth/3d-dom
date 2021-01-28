

import React, { useEffect, useMemo, useRef, useState } from "react" 
import { Vector3, TextureLoader } from "three"
import { useThree, useFrame } from "react-three-fiber"
import vertexShader from "./wave.vert"
import fragmentShader from "./wave.frag" 
import {getObject} from "./utils" 
import Scroller from "./Scroller" 

export default function WebglImage({
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
        }

        window.addEventListener("scroll", onScroll)

        onScroll()

        return () => {
            window.removeEventListener("scroll", onScroll)
        }
    }, [obj])

    useFrame(() => {
        uniforms.uTime.value += .01
 
        ref.current.position.x = obj.position[0]
        ref.current.position.y = obj.position[1] + (Scroller.position * obj.ratio)
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