class AnimatedProperty {
  
  constructor(key, fromValue, toValue){
    if (!key) {
        throw "Butter.AnimatedProperty: Cannot animate a property without a key."
    }
    
    const f = this.parseValue(fromValue), t = this.parseValue(toValue)
    
    if (!t.unit) {
      t.unit = f.unit // assume `fromValue` unit if not present.
    }
    
    if (!((!f.unit && !t.unit) || (f.unit === t.unit))) {
      throw `Butter.AnimatedProperty: Unit for values mismatch. Animating from "${f.unit}" to "${t.unit}" is not supported.`
    }
    
    this.fromValue = f.floatValue
    this.toValue = t.floatValue
    this.unit = f.unit
    this.key = key
  }
  
  parseValue(value){
    let floatValue = 0.0, unit = undefined
  
    if (typeof value === 'string' || value instanceof String) {
      floatValue = parseFloat(value)
      unit = (value.match(/[\d.\-\+]*\s*(.*)/)[1] || '')
      
    } else if (!isNaN(value)) {
      floatValue = value
    }
    
    return { unit: unit, floatValue: floatValue }
  }
  
  get reversed(){
    return (new AnimatedProperty(this.key, this.toValue, this.fromValue))
  }
  
}

export default AnimatedProperty
