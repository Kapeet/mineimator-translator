

import { flatMap } from "lodash";
import isObject from "lodash/isObject";
import translate from 'translate'


export const parseJsonObject = async (json) => {
  for (const [obj, key, value] of iter(json)) {
      console.log('currently processing key ',key)
      if (typeof value !== 'string') return;
      try {
        obj[key] = await translate(value, 'he');
      }
      catch (e) {
          console.warn(e, value);
          obj[key] = value;
      }
  }
  return json;
}


function* iter(obj){
    for (const [key, value] of Object.entries(obj)) {
        if (Object(value) !== value) yield [obj, key, value];
        else yield* iter(value);
    }
}
