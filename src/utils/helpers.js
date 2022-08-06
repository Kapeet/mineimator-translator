

import isObject from "lodash/isObject";
import translate from 'translate'


export const parseJsonObject = async json => {
    const jsonObjectIsNotValid = !Object.entries(json).length || !json
    if (jsonObjectIsNotValid) return;

    const newJson = Object.entries(json).map(([key, value]) => {
        console.log({key,value})
        if (isObject(value)) {
            return parseJsonObject(value);
        }

    });

    return newJson;
}
