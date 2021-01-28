import React, { useState } from "react"
import SyncedDom from "../SyncedDom"
import { Only } from "../utils"
import Page from "../Page"
import { Link } from "@reach/router"
import Scroller from "../Scroller"

export default function About() {
    let [toggle, setToggle] = useState(false)

    return (
        <Page>
            <h1>About</h1>
            <Link onClick={()=> Scroller.set(0)} to="/about"> to about</Link> or  <Link onClick={()=> Scroller.set(0)} to="/">go home</Link>
            <p>About tiam in efficitur nulla, in porta diam. Aliquam ac orci dapibus, accumsan massa sed, facilisis lacus. Donec vel mattis nisi. Curabitur consequat lacinia eros, ac tristique nisl volutpat id. Phasellus sed neque eget quam tincidunt vulputate a et tellus. Mauris tincidunt tempus turpis, eu viverra metus vehicula pharetra. Nulla purus mauris, eleifend a massa sit amet, laoreet viverra mauris. Morbi gravida egestas gravida. Nullam tempor nunc vel ligula varius, sed fermentum quam rhoncus. Sed nec justo ac velit ultricies semper vitae quis risus.</p>

            <SyncedDom
                url="https://images.unsplash.com/photo-1562639410-3f9ff4e00b15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80&h=1000"
                width={600}
                height={700}
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

            <Link onClick={()=> Scroller.set(0)} to="/about"> to about</Link> or  <Link onClick={()=> Scroller.set(0)} to="/">go home</Link>

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

            <button onClick={() => setToggle(prev => !prev)}>Toggle me</button>

            <Only if={toggle}>
                <SyncedDom
                    url="https://images.unsplash.com/photo-1560400615-79776f7438e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1275&q=80&h=400"
                    height={350}
                />
            </Only>

            <h2>Consectetur adipiscing elit, egestas ac mattis id, congue quis elvamus dui pu adipiscing eliquam Vivamus orci dapibus</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dui purus, egestas ac mattis id, congue quis elit. Nulla orci velit, semper nec cursus ut, bibendum sit amet turpis. Vestibulum et enim ut leo venenatis accumsan. Integer non sodales ante. Aliquam iaculis leo sed dictum mollis. Nam faucibus hendrerit dui et facilisis. Aenean eget pellentesque risus. Nulla facilisi. Nunc lobortis, turpis ullamcorper cursus rhoncus, est velit pharetra elit, quis fermentum odio diam a tellus. Integer ac sem sem. Suspendisse dui arcu, finibus eget justo ut, venenatis lobortis lorem. Nullam interdum orci id erat elementum, non egestas ante cursus. Nullam in suscipit velit, sit amet dapibus mauris. Sed finibus condimentum ex in suscipit. Nunc ut posuere velit. Mauris pharetra tempus ex a convallis.</p>
            <SyncedDom
                height={500}
                url="https://images.unsplash.com/photo-1603139875501-8c965c19e10d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80&h=500"
            />
        </Page> 
    )
}