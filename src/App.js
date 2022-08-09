import logo from './assets/icon.png';
import './App.css';
import { useState } from 'react';
import languageJson from './assets/language.json'
import { parseJsonObject } from './utils/helpers';
import ISO6391 from 'iso-639-1'
import { Button, CircularProgress, MenuItem, Select } from '@mui/material';
import {Spacer} from './components/Spacer'

function App() {

  const [translatedJson, setTranslatedJson] = useState(null)
  const [selectedLanguage, setSelectedLanguage] = useState(ISO6391.getAllNames()[1]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const onInitiatedTranslate = async language => {
    if (!language) {
      setError(`invalid language selected ${language}`);
      return;
    }
    setLoading(true)
    const languageCode = ISO6391.getCode(language);
    const translatedJson = await parseJsonObject(languageJson, languageCode);
    setTranslatedJson(translatedJson);
    setLoading(false);
}

console.log(selectedLanguage)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <label>Choose a language to translate to:</label>
        <Spacer />
        <Select variant='filled' value={selectedLanguage} placeholder='Select a language...' onChange={e => setSelectedLanguage(e.target.value)}>
        {ISO6391.getAllNames().map(language => <MenuItem key={language} value={language}>{language}</MenuItem>)}
        </Select>
        <Spacer />
        {loading ? <CircularProgress /> :
        <Button variant='contained' disabled={!languageJson} onClick={() => onInitiatedTranslate(selectedLanguage)}>Translate!</Button>
      }
              <Spacer />
        {error ? error : null}
        <Spacer />
        <pre style={{textAlign: 'start', fontSize: 9}}>
          <code>
            {JSON.stringify(translatedJson) ?JSON.stringify(translatedJson, null, 2) : null}
          </code>
        </pre>

        
        
      </header>
    </div>
  );
}

export default App;
