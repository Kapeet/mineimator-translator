
import translate from 'translate'


export const translateJsonObject = async (json, languageCode) => {

  const keyValuePairArray = parseJsonIntoKeyValuePairs(json);
  const valuesArray = keyValuePairArray.map(obj => obj.value);
  const translatedValues = []
  while (valuesArray.length > 0) {
    const chunk = valuesArray.splice(0,100);
    const translatedChunk = await translate(chunk.toString(),languageCode)
    try {
      translatedValues.push(translatedChunk.split(','));

    }
    catch (error) {
      console.error('error while parsing translated chunk', {error, translatedChunk});
    }
  }
  const jsonWithTranslatedValues = turnTranslatedValuesBackToJsonFormat(json,translatedValues)
  return jsonWithTranslatedValues;
}

function turnTranslatedValuesBackToJsonFormat(json, keyValuePairArray) {
  for (const [obj, key, value] of iter(json)) {
    if (typeof value !== 'string') return;
    obj[key] = keyValuePairArray.shift();
    try {
      }
      catch (e) {
          console.warn(e, value);
      }
  }
  return json;
}

function parseJsonIntoKeyValuePairs(json) {
  const  keyValuePairArray = [];
  for (const [key, value] of iter(json)) {
    if (typeof value !== 'string') return;
    keyValuePairArray.push({
      key: key,
      value: value,
    });
    try {
      }
      catch (e) {
          console.warn(e, value);
      }
  }
  return keyValuePairArray
}
function* iter(obj){
    for (const [key, value] of Object.entries(obj)) {
        if (Object(value) !== value) yield [obj, key, value];
        else yield* iter(value);
    }
}


export function downloadJsonAsMilanguageFile(data, filename) {
  const pom = document.createElement('a');
  const csvContent = data;
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  pom.href = url;
  pom.setAttribute('download', `${filename}`);
  pom.click();
};