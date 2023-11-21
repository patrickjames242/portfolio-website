import 'helpers/prototypeExtensions';
import { BrowserRouter } from 'react-router-dom';
import MainScreen from './MainScreen/MainScreen';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <MainScreen />
    </BrowserRouter>
  );
}

export default App;
