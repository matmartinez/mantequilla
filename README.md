
> "Scrolls like butter."

—Steve Jobs

# Installation

If you use npm, just run `npm install mantequilla`. You can also download the [latest release](https://github.com/matmartinez/mantequilla/releases/) and import it manually.

Mantequilla uses modules. It's easier to get started with a bundler. Pick your poison, mine is [Parcel](https://github.com/parcel-bundler/parcel):

```js
import Mantequilla from 'mantequilla'
```


# Quick start

Mantequilla is quite flexible. It can animate any property for any given object, smoothly interpolating between values.

Here's an example that moves a `<div>` just by animating its `style` property:

```js
const element = document.querySelector('div')
const animator = new Mantequilla.animator(element.style)

animator.animate({ marginLeft: 500 }, 1000)
```

As previously stated, there are no restrictions to which objects can be animated. On the following example, the scroll position is nicely animated using an spring:

```js
function scrollTo(target){
  const options = { timing: Mantequilla.spring({ damping: 16 }) }
  const animator = new Mantequilla.animator(document.body, options)
  
  animator.animate({ scrollTop: target.offsetTop }, 1000)
}

scrollTo(document.querySelector('#interesting'))
```

**Tip:** You can also animate multiple properties at the same time by passing more entries.

# Springs

```js
const options = { timing: Mantequilla.spring({ damping: 16 }) }
const animator = new Mantequilla.animator(target, options)
```

You can simulate the physics of a spring by using the `Mantequilla.spring()` function. Its only parameter is a dictionary which allows control over physically based attributes such as the spring's damping and stiffness:

### damping
Defines how the spring’s motion should be damped due to the forces of friction. By default 10.

### stiffness
The spring stiffness coefficient. By default 100.

### mass
The mass of the object attached to the end of the spring. By default 1.

### initialVelocity
The initial velocity of the object attached to the spring. By default 0.
 

# Repetition and other options

```js
const animator = new Mantequilla.animator(target, options)
```

Additional settings can be configured on the animator using the `options` parameter with these keys:

### timing
`timing` allows you to specify a cubic Bézier timing function to apply to your animation. You can use the built-in functions from `Mantequilla.TimingFunctions` for the familiar ease in, ease out, and others; or write your own function.

By default `Mantequilla.timingFunctions.easeOutCubic`

### repeatCount
Determines the number of times the animation will repeat. By default 0, which means no repetition. You can specify `Infinity` for an indefinite repetition.

### autoreverses
Determines if the animation plays in reverse upon completion. By default `true`.

### interruptAnimationEvents
A list of event names that should cause the animation to stop. By default a list of events related to scrolling.

# Callbacks

### Upon animation completion
You can specify a function to be called when the animation completes by passing a function as the third parameter on `animate()`:

```js
animator.animate({ opacity: 0 }, 900, () => {
  console.log('The animation has completed')
})
```

### On animation frames
The `didAnimate` property can be set with a function that runs for every frame of the animation. This can come in handy when using a Canvas.

```js
animator.didAnimate = () => {
  redraw()
}
```

# Demo

Run these to see the live demo:

```
git clone https://github.com/matmartinez/mantequilla.git
cd mantequilla
npm start
```

# Documentation
 
A work in progress!
