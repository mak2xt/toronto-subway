import { Subscription } from "rxjs/Subscription";

export type Subscriptions = {
  [key: string]: Subscription;
};

export function unsubscribeAll(subs: Subscriptions) {
  for (let key of Object.keys(subs)) {
    subs[key].unsubscribe();
  }
}
