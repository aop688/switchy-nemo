import { HashRouter } from 'react-router';
import Routes from './routes';
import '@options/styles/index.css';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes />
    </HashRouter>
  );
};

export default App;
