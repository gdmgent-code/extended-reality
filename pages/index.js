import React from 'react'
import Head from 'next/head'
import { Entity, Scene } from 'aframe-react'

import '../sass/app.scss'

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            appRendered: false,
            color: 'blue'
        }
    }

    componentDidMount() {
        if (typeof window !== 'undefined') {
            require('aframe')
            require('aframe-animation-component')
            require('aframe-particle-system-component')
            this.setState({ appRendered: true })
        }
    }

    changeColor() {
        const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
        this.setState({
            color: colors[Math.floor(Math.random() * colors.length)]
        })
    }

    things() {
        let things = []
        for(let i=0;i<400;i+=1) {
            things.push(
                <Entity gltf-model="/static/models/imp/scene.gltf" position={{x: -200+i, y: 1, z: -1}} 
                        rotation="0 -360 0"
                        animation__yoyo={{property: 'rotation', dur: 1000+Math.random()*4000, loop: true, to: '0 360 0'}}/>
            )
        }
        return things
    }

    render() {
        return (
            <div style={{height: '100%', width: '100%'}}>
                {this.state.appRendered &&
                <Scene>
                    <a-assets>
                        <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg" />
                        <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg" />
                    </a-assets>
                    
                    <Entity primitive="a-plane" src="#groundTexture" rotation="-90 0 0" height="100" width="100"/>
                    <Entity primitive="a-light" type="ambient" color="#445451"/>
                    <Entity primitive="a-light" type="point" intensity="2" position="2 4 4"/>
                    <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"/>
                    <Entity particle-system={{preset: 'snow', particleCount: 2000}}/>
                    <Entity text={{value: 'Hello, A-Frame React!', align: 'center'}} position={{x: 0, y: 2, z: -1}}/>
                    { this.things() }
                    <Entity id="box"
                    geometry={{primitive: 'box'}}
                    material={{color: this.state.color, opacity: 0.6}}
                    animation__rotate={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}}
                    animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1'}}
                    position={{x: 0, y: 1, z: -3}}
                    events={{click: this.changeColor.bind(this)}}>
                    <Entity animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '2 2 2'}}
                            geometry={{primitive: 'box', depth: 0.2, height: 0.2, width: 0.2}}
                            material={{color: '#24CAFF'}}/>
                    </Entity>
                    
                    <Entity primitive="a-camera">
                    <Entity primitive="a-cursor" animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}}/>
                    </Entity>
                    
                </Scene>}
            </div>
        )
    }
}