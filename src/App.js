import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import languageJson from './assets/language.json'
import { parseJsonObject } from './utils/helpers';
function App() {


  const [languageFileJson, setLanguageFileJson] = useState(languageJson)
  const [translatedJson, setTranslatedJson] = useState(null)


  const onInitiatedTranslate = async () => {
    const translatedJson = await parseJsonObject(languageFileJson);
    setTranslatedJson(translatedJson);
}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button disabled={!languageFileJson} onClick={onInitiatedTranslate}>deez</button>
        <pre style={{textAlign: 'start', fontSize: 9}}>
          <code>
            {JSON.stringify(translatedJson, null, 2)}
          </code>
        </pre>
      </header>
    </div>
  );
}

export default App;
