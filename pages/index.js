import React from 'react'
import ReactDOM from 'react-dom'
import { Entity, Scene } from 'aframe-react'

import '../sass/app.scss'

export default class extends React.Component {
  render() {
    return (
        <div style={{height: '100%', width: '100%'}}>
            <Scene>
                <Entity geometry={{primitive: 'box'}} material={{color: 'red'}} position={{x: 0, y: 0, z: -5}}/>
                <Entity particle-system={{preset: 'snow'}}/>
                <Entity light={{type: 'point'}}/>
                <Entity gltf-model={{src: 'virtualcity.gltf'}}/>
                <Entity text={{value: 'Hello, WebVR!'}}/>
            </Scene>
        </div>
    )
  }
}