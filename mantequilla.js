import KeyedAnimator from "./lib/KeyedAnimator.js"
import SpringTimingFunctionProvider from "./lib/SpringTimingFunctionProvider.js"
import * as TimingFunctions from "./lib/TimingFunctions.js"

export default {
  animator: KeyedAnimator,
  timingFunctions: TimingFunctions,
  spring: SpringTimingFunctionProvider
}
