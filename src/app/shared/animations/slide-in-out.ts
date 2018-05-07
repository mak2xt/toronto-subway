import {
  animate,
  AnimationTransitionMetadata,
  style,
  transition
} from "@angular/animations";

export function SlideOutTransition(
  stateExpr: string,
  duration: string
): AnimationTransitionMetadata {
  return transition(stateExpr, [
    animate(
      `${duration} ease-in`,
      style({ transform: "translateY(100%)", opacity: 0, height: 0 })
    )
  ]);
}

export function SlideInTransition(
  stateExpr: string,
  duration: string
): AnimationTransitionMetadata {
  return transition(stateExpr, [
    style({ transform: "translateY(100%)", opacity: 0, height: 0 }),
    animate(
      `${duration} ease-out`,
      style({ transform: "translateY(0%)", opacity: 1, height: "*" })
    )
  ]);
}
