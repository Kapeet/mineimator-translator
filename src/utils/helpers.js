

import isObject from "lodash/isObject";
import translate from 'translate'


export const parseJsonObject = json => {
    const jsonObjectIsNotValid = !Object.entries(json).length || !json
    if (jsonObjectIsNotValid) return;

    const newJson = Object.entries(json).map(([key, value], index) => {
        if (index > 6) return;
        //some values are actually objects, so we are using a recursion here to catch every object type value
        if (isObject(value)) {
            return parseJsonObject(value);
        }
        // const newValue = translate(value, "es")
        const newValue = value;
        return {[key]: newValue};

    });
    console.log({newJson })
    return newJson;
}
