import { reactExtendComponentsCustomMergeFn } from '@/helpers/general/reactExtendComponentsCustomMergeFn';
import 'helpers/prototypeExtensions';
import { MergeFunctionProvider } from 'react-extend-components';
import { BrowserRouter } from 'react-router-dom';
import MainScreen from './MainScreen/MainScreen';

function App(): JSX.Element {
  return (
    <MergeFunctionProvider propsMergeFn={reactExtendComponentsCustomMergeFn}>
      <BrowserRouter>
        <MainScreen />
      </BrowserRouter>
    </MergeFunctionProvider>
  );
}

export default App;
