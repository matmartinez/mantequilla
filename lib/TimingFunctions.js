export const linear = (t) => { return t }

export const easeInQuad = (t) => { return t*t }

export const easeOutQuad = (t) => { return t*(2-t) }

export const easeInOutQuad = (t) => { return t<.5 ? 2*t*t : -1+(4-2*t)*t }

export const easeInCubic = (t) => { return t*t*t }

export const easeOutCubic = (t) => { return (--t)*t*t+1 }

export const easeInOutCubic = (t) => { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }

export const easeInQuart = (t) => { return t*t*t*t }

export const easeOutQuart = (t) => { return 1-(--t)*t*t*t }

export const easeInOutQuart = (t) => { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t }

export const easeInQuint = (t) => { return t*t*t*t*t }

export const easeOutQuint = (t) => { return 1+(--t)*t*t*t*t }

export const easeInOutQuint = (t) => { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
