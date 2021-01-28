
import React, { useEffect, useMemo, useRef, useState } from "react" 

export function getObject(size, camera, destination, z) {
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

export function Only(props) {
    return props.if ? <>{props.children}</> : null
}