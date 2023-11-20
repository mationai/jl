/**
* @title Simple Physics Engine
* @Note To run in in React env, paste these in index.html:
    <!-- preload non-module content assets -->
    <script type="text/javascript" src="/demo/spe/spe.js"></script>
    <script type="text/javascript" src="/demo/spe/spe_demo.js"></script>
*/
// @ts-nocheck
import { useRef, useEffect } from 'react'

export default function SPE() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref?.current || !window?.initSPE)
      return
    window.initSPE(ref.current)
  }, [ref, window])

  return <div>
    <p>
      A Simple 2D Physics Engine in Javascript with no dependencies.
      <span className='ml05'>Supports:</span>
    </p>
      <ul>
      <li>ability to group of different objects</li>
      <li>collision policy setting based on groups</li>
      <li>support rendering using canvas, SVG, or WebGL</li>
      </ul>
    <p>
      Source with more details: <a href='https://github.com/mationai/SPE.js' target='_blank'>Simple Physics Engine</a>
    </p>
    <p>Canvas Demo:</p>
    <canvas ref={ref} style={{
      backgroundColor: 'white',
      border: '1px solid black',
    }}
      height="400" width="500" id="canvas">
    </canvas>
  </div>
}