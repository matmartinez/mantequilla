import AnimatedProperty from "./AnimatedProperty.js"

class KeyedAnimator {
  
  constructor(target, options){
    if (!target) {
        throw "Butter.KeyedAnimator: Cannot instantiate an animator without a target."
    }
    
    options = (options || {})
    
    this.target = target
    this.timing = options.timing || TimingFunctions.easeOutCubic
    this.autoreverses = options.autoreverses || true
    this.repeatCount = options.repeatCount || 0
    this.interruptAnimationEvents = [ "mousewheel", "touchstart" ]
  }
  
  animate(to, duration, completion){
    if (this.animating) {
      this.stopAnimation()
    }
    
    const properties = []
    
    for (const key in to) {
      const property = new AnimatedProperty(key, this.target[key], to[key])
      if (property) {
        properties.push(property)
      }
    }
    
    this.duration = Math.max(duration, 0.1)
    this.beginTime = 0.0
    this.properties = properties
    this.completion = completion
    this.completed = false
    
    this.startAnimation()
  }
  
  update(){
    if (this.beginTime == 0.0) {
      this.beginTime = new Date().getTime()
    } else {
      let deltaTime = (new Date().getTime() - this.beginTime)
      let progress = (deltaTime / this.duration)
      let target = this.target
      
      this.updateTarget(progress)
    }
  }
  
  updateTarget(progress){
    const target = this.target
          
    function out(value, unit){
      if (unit) {
        value = String(value) + unit
      }
      return value
    }
    
    function set(object, keyPath, value){
      let components = keyPath.split("."),
          componentsCount = components.length
      
      if (componentsCount > 1) {
        let count = (componentsCount - 1)
        for (let idx = 0; idx < count; idx += 1) {
          object = object[components[idx]]
        }
      }
      
      let lastPathComponent = (componentsCount > 0) ? (components[componentsCount - 1]) : keyPath
      object[lastPathComponent] = value
      
      return object
    }
    
    if (progress < 1.0) {
      if (1 - progress < 0.001) {
        for (const property of this.properties) {
          set(target, property.key, out(property.toValue, property.unit))
        }
        
        this.complete()
      } else {
        const percent = this.timing(progress)
        
        for (const property of this.properties) {
          const value = (property.fromValue + (property.toValue - property.fromValue) * percent)
          
          set(target, property.key, out(value, property.unit))
        }
      }
    } else {
      for (const property of this.properties) {
        set(target, property.key, out(property.toValue, property.unit))
      }
      
      this.complete()
    }
  }
  
  complete(){
    let iteration = (this.iterationCount + 1)
    let completed = (iteration > this.repeatCount)
    
    if (!completed) {
      this.beginTime = 0.0
      
      if (this.autoreverses) {
        const reversed = []
        
        for (const property of properties) {
          reversed.push(property.reversed)
        }
        
        this.properties = reversed
      } else {
        this.updateTarget(0.0) // Manually update target to initial value.
      }
    }
    
    this.iterationCount = iteration
    
    if (completed) {
      this.completed = true
      this.stopAnimation()
    }
  }
  
  stopAnimation(){
    if (!this.animating) {
      return
    }
    
    this.animating = false
    
    let targetScrollEventHandler = this.targetScrollEventHandler
    if (targetScrollEventHandler) {
      this.target.removeEventListener(targetScrollEventHandler)
    }
    
    let request = this.frameRequest
    if (request) {
      cancelAnimationFrame(request)
    }
    
    let completion = this.completion
    if (completion) {
      completion(this.completed)
    }
    
    this.completion = undefined
  }
  
  startAnimation(){
    if (this.animating) {
      return
    }
    
    this.animating = true
    this.iterationCount = 0
    
    const targetScrollEventHandler = this.stopAnimation.bind(this)
    
    if (this.target.addEventListener) {
      for (const name of this.interruptAnimationEvents) {
        this.target.addEventListener(name, targetScrollEventHandler)
      }
    }
    
    const update = this.update.bind(this)
    
    const animate = () => {
      update()
      schedule()
      
      if (this.didAnimate) {
        this.didAnimate()
      }
    }
    
    const schedule = () => {
      if (this.animating) {
        this.frameRequest = requestAnimationFrame(animate, this)
      }
    }
    
    schedule()
  }
  
}

export default KeyedAnimator

