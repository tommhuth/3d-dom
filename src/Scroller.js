export default class Scroller {
    static position = 0
    static target = 0

    static init() {
        window.addEventListener("scroll", () => {
            this.target = window.scrollY
        })

        let update = () => {
            if (this.position !== this.target) { 
                this.position += (this.target - this.position) * .1

                if (Math.abs(this.target - this.position) < .25) {
                    this.position = this.target
                }
            }

            requestAnimationFrame(update)
        }

        requestAnimationFrame(update)
    }
    static set(position) {
        this.position = position
        this.target = position
    }
}

Scroller.init()