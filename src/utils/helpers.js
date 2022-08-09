
import translate from 'translate'


export const parseJsonObject = async (json, languageCode) => {
  console.log({languageCode})
  for (const [obj, key, value] of iter(json)) {
    if (typeof value !== 'string') return;
    try {
        obj[key] = await translate(value, languageCode);
      console.log(`translated key ${key} result: ${obj[key]}`);
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
