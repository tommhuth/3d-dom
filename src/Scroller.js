export default class Scroller {
    static position = window.scrollY
    static target = window.scrollY

    static init() { 
        window.addEventListener("scroll", () => {
            this.target = window.scrollY
        })

        let update = () => { 
            this.position += (this.target - this.position) * .1
            requestAnimationFrame(update)
        }

        requestAnimationFrame(update)
    } 
}

Scroller.init()