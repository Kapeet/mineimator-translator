import logo from './assets/icon.png';
import './App.css';
import { useState } from 'react';
import languageJson from './assets/language.json'
import { parseJsonObject } from './utils/helpers';
import ISO6391 from 'iso-639-1'
import { Autocomplete, Button, CircularProgress, TextField } from '@mui/material';
import {Spacer} from './components/Spacer'
import styled from '@emotion/styled';

function App() {

  const [translatedJson, setTranslatedJson] = useState(null)
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const onInitiatedTranslate = async language => {
    if (!language) {
      setError(`invalid language selected ${language}`);
      return;
    }
    setLoading(true)
    const languageCode = ISO6391.getCode(language);
    let translatedJson
    try {
      translatedJson = await parseJsonObject(languageJson, languageCode);
    }
    catch (e) {
      translatedJson = null;
      setError(e);
    }
    setTranslatedJson(translatedJson);
    setLoading(false);
}

const onChangedLanguage = (event, newLanguage) => {
  setError('')
  setSelectedLanguage(newLanguage)
}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Spacer />
        <label>Choose a language to translate to:</label>
        {error ? <p style={{color: 'darkred'}}>{error}</p> : null}
        <Spacer />
        <StyledAutocomplete
        style={{width: '300px'}}
          renderInput={params => <TextField {...params} label="Select a Language" />}
          options={ISO6391.getAllNames()}  
          value={selectedLanguage} 
          onChange={onChangedLanguage}
         />
        <Spacer />
        {loading ? (
          <span>
            <CircularProgress />
            <p>
              This might take a few minutes, 
              check the console tab in the devtools (F12) for more info
            </p>
          </span>
        ) :
        <Button variant='contained' disabled={!languageJson} onClick={() => onInitiatedTranslate(selectedLanguage)}>Translate!</Button>
      }

        <Spacer />
        <pre style={{textAlign: 'start', fontSize: 9}}>
          <code>
            {translatedJson ? JSON.stringify(translatedJson, null, 2) : null}
          </code>
        </pre>

        
        
      </header>
    </div>
  );
}

const StyledAutocomplete = styled(Autocomplete)`
  & .MuiAutocomplete-inputRoot {
    color: white;
  }

  & .
`
export default App;
