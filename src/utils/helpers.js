

import isObject from "lodash/isObject";
import translate from 'translate'


export const parseJsonObject = async (json) => {
    const jsonObjectIsNotValid = !Object.keys(json).length || !json
    if (jsonObjectIsNotValid) {
        console.warn('invalid json', json);
        return null;
    }
    console.log({json})
    const entries = Object.entries(json)
    const newJsonEntries = await Promise.all(entries.map(async ([key, rawvalue]) => {
        
        const value = json[key];
        //some values are actually objects, so we are using a recursion here to catch every object type value
        if (isObject(value)) {
            return parseJsonObject(value);
        }
        try {
            // const newValue = await translate(value, "he");
            const newValue = 'deez';
            return [key, newValue];
        }
        catch(e) {
            console.warn(e);
            return [key, value];
        }
        // const newValue = value;
        
        }));
        return Object.fromEntries(newJsonEntries);
}
    
    // for (const [key, value] of Object.entries(newjson)) {
    //     console.log({key, value}    )
    //     if (typeof value === 'object') {
    //         newjson[key] = await parseJsonObject(value);
    //     }
    //     try {
    //         newjson[key] = await translate(value, "he");
    //     }
    //     catch {
    //     }
    // }