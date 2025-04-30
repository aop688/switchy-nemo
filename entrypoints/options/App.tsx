import { HashRouter } from 'react-router';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes />
    </HashRouter>
  );
};

export default App;
