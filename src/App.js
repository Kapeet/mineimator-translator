import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import languageJson from './assets/language.json'
import { parseJsonObject } from './utils/helpers';
function App() {


  const [languageFileJson, setLanguageFileJson] = useState(languageJson)
  const [translatedJson, setTranslatedJson] = useState(null)


  const onInitiatedTranslate = () => {
    const translatedJson = parseJsonObject(languageFileJson);
    console.log(translatedJson);
    setTranslatedJson(translatedJson);
}
  useEffect(() => {
console.log(languageFileJson)
  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button disabled={!languageFileJson} onClick={onInitiatedTranslate}>deez</button>
      </header>
    </div>
  );
}

export default App;
