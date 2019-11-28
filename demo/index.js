import Mantequilla from "../mantequilla.js"

function awake(){
  const element = document.createElement("figure")
  const style = element.style
  style.position = "absolute"
  style.background = "#f9671e"
  style.width = 200
  style.height = 200
  style.borderRadius = "16px"
  style.left = 32
  style.top = 32
  
  document.body.appendChild(element)
  
  const duration = 2000
  const options = { timing: Mantequilla.spring({ damping: 19 }) }
  const animator = new Mantequilla.animator(style, options)
  
  animator.animate({ left : 500.0 }, duration, () => {
    console.log("The animation did finish.")
  })
}

document.addEventListener("DOMContentLoaded", awake)
