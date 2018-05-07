export function arrayObjectIndexOf(
  myArray: any[],
  searchTerm: any,
  property: string
): number {
  for (var i = 0, len = myArray.length; i < len; i++) {
    if (myArray[i][property] === searchTerm) return i;
  }
  return -1;
}

const count = names =>
  names.reduce((a, b) => Object.assign(a, { [b]: (a[b] || 0) + 1 }), {});

const duplicates = dict => Object.keys(dict).filter(a => dict[a] > 1);

export const duplicateValues = (names: any[]) => duplicates(count(names));

export function simulatedClick(target: Element, options?: any) {
  var event = target.ownerDocument.createEvent("MouseEvents"),
    options = options || {},
    opts = {
      // These are the default values, set up for un-modified left clicks
      type: "click",
      canBubble: true,
      cancelable: true,
      view: target.ownerDocument.defaultView,
      detail: 1,
      screenX: 0, //The coordinates within the entire page
      screenY: 0,
      clientX: 0, //The coordinates within the viewport
      clientY: 0,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false, //I *think* 'meta' is 'Cmd/Apple' on Mac, and 'Windows key' on Win. Not sure, though!
      button: 0, //0 = left, 1 = middle, 2 = right
      relatedTarget: null
    };

  //Merge the options with the defaults
  for (var key in options) {
    if (options.hasOwnProperty(key)) {
      opts[key] = options[key];
    }
  }

  //Pass in the options
  event.initMouseEvent(
    opts.type,
    opts.canBubble,
    opts.cancelable,
    opts.view,
    opts.detail,
    opts.screenX,
    opts.screenY,
    opts.clientX,
    opts.clientY,
    opts.ctrlKey,
    opts.altKey,
    opts.shiftKey,
    opts.metaKey,
    opts.button,
    opts.relatedTarget
  );

  return event;
}
