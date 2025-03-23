import * as dat from 'dat.gui'

const gui = new dat.GUI()
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight


const wave = {
  y: canvas.height / 2,
  length: 0.01,
  amplitude: 100,
  frequency: 0.01,
  dynamicColor: false
}

const strokeColor = {
  hue: 0,
  saturation: 100,
  lightness: 47
}

const backgroundColor = {
  r: 0,
  g: 0,
  b: 0,
  a: 0.071
}

const waveFolder = gui.addFolder('Wave')
waveFolder.add(wave, 'y', 0, canvas.height)
waveFolder.add(wave, 'length', -0.01, 0.01)
waveFolder.add(wave, 'amplitude', -300, 300)
waveFolder.add(wave, 'frequency', -0.01, 1)
waveFolder.add(wave, 'dynamicColor', false, true)
waveFolder.open()

const strokeFolder = gui.addFolder('Stroke Color')
strokeFolder.add(strokeColor, 'hue', 0, 255)
strokeFolder.add(strokeColor, 'saturation', 0, 100)
strokeFolder.add(strokeColor, 'lightness', 0, 100)
strokeFolder.open()

const backgroundFolder = gui.addFolder('Background Color')
backgroundFolder.add(backgroundColor, 'r', 0, 255)
backgroundFolder.add(backgroundColor, 'g', 0, 255)
backgroundFolder.add(backgroundColor, 'b', 0, 255)
backgroundFolder.add(backgroundColor, 'a', 0, 1)
backgroundFolder.open()


let increment = wave.frequency
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = `rgba(
    ${backgroundColor.r}, 
    ${backgroundColor.g}, 
    ${backgroundColor.b}, 
    ${backgroundColor.a}
  )`
  c.fillRect(0, 0, canvas.width, canvas.height)
  c.beginPath()

  c.moveTo(0, canvas.height / 2)

  for (let i = 0; i < canvas.width; i++) {
    c.lineTo(i, wave.y + Math.sin(i * wave.length + increment) * wave.amplitude * Math.sin(increment))
  }
  c.strokeStyle = `hsl(
    ${wave.dynamicColor ? Math.abs(strokeColor.hue * Math.sin(increment)) : strokeColor.hue}, 
    ${strokeColor.saturation}%, 
    ${strokeColor.lightness}%
  )`
  c.stroke()

  increment += wave.frequency
}

animate()

