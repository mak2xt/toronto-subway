import {
  animate,
  AnimationTransitionMetadata,
  style,
  transition
} from "@angular/animations";

export function FadeOutTransition(
  stateExpr: string,
  duration: string
): AnimationTransitionMetadata {
  return transition(stateExpr, [
    animate(`${duration} ease-in`, style({ opacity: 0 }))
  ]);
}

export function FadeInTransition(
  stateExpr: string,
  duration: string
): AnimationTransitionMetadata {
  return transition(stateExpr, [
    style({ opacity: 0 }),
    animate(`${duration} ease-out`, style({ opacity: 1 }))
  ]);
}
