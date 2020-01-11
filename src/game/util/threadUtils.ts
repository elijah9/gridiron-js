// stolen from https://stackoverflow.com/questions/22125865/wait-until-flag-true
export function waitFor(condition : Function, callback : Function, tick : number) {
  if(!condition()) {
    window.setTimeout(waitFor.bind(null, condition, callback), tick);
  } else {
    callback();
  }
}