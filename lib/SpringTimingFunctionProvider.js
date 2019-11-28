const { sqrt, exp, cos, sin, cosh, sinh } = Math
  
function SpringTimingFunctionProvider(options = {}){
  const {
    damping = 10,
    mass = 1,
    stiffness = 100,
    initialVelocity = 0
  } = options
  
  const b = damping, m = mass, k = stiffness, v0 = initialVelocity
  
  return (t) => {
    const beta = b / (2.0 * m)
    const omega0 = sqrt(k / m)
    const omega1 = sqrt((omega0 * omega0) - (beta * beta))
    const omega2 = sqrt((beta * beta) - (omega0 * omega0))
    const x0 = -1.0
    const envelope = exp(-beta * t)
    
    let fraction
    
    if (beta < omega0) {
      fraction = -x0 + envelope * (x0 * cos(omega1 * t) + ((beta * x0 + v0) / omega1) * sin(omega1 * t))
    } else if (beta == omega0) {
      fraction = -x0 + envelope * (x0 + (beta * x0 + v0) * t)
    } else {
      fraction = -x0 + envelope * (x0 * cosh(omega2 * t) + ((beta * x0 + v0) / omega2) * sinh(omega2 * t))
    }
    
    return fraction
  }
}

export default SpringTimingFunctionProvider
