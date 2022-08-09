import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import languageJson from './assets/language.json'
import { parseJsonObject } from './utils/helpers';
import ISO6391 from 'iso-639-1'

function App() {

  const [translatedJson, setTranslatedJson] = useState(null)
  const [selectedLanguage, setSelectedLanguage] = useState(ISO6391.getAllNames()[0]);
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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <label>Choose a language to translate to:</label>
        <select value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)}>
          {ISO6391.getAllNames().map(language => <option key={language}>{language}</option>)}
        </select>
        <br />
        <button disabled={!languageJson} onClick={() => onInitiatedTranslate(selectedLanguage)}>Translate!</button>
        {error ? error : null}
        {loading ? 'Processing, please wait...' :
        (
        <pre style={{textAlign: 'start', fontSize: 9}}>
          <code>
            {JSON.stringify(translatedJson) ?JSON.stringify(translatedJson, null, 2) : null}
          </code>
        </pre>

        )
        }
      </header>
    </div>
  );
}

export default App;
