

import isObject from "lodash/isObject";
import translate from 'translate'


export const parseJsonObject = async json => {
    const jsonObjectIsNotValid = !Object.entries(json).length || !json
    if (jsonObjectIsNotValid) return;

    const newJson = Object.entries(json).map(async ([key, value], index) => {
        if (index > 16) return;
        //some values are actually objects, so we are using a recursion here to catch every object type value
        if (isObject(value)) {
            return parseJsonObject(value);
        }
        const newValue = await translate(value, "es");
        // const newValue = value;
        return {[key]: newValue};

    });
    return newJson;
}
