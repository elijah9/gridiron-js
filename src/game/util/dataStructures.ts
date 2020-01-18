export function hasValue<K, V>(map : Map<K, V>, value : V) : boolean {
  return hasHelper(map.values(), value);
}

export function has<K>(arr : K[], value : K) {
  return hasHelper(arr, value);
}

function hasHelper<K>(container : Iterable<K>, value : K) {
  for(let v of container) {
    if(v === value) {
      return true;
    }
  }
  return false;
}