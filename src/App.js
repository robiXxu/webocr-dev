import './index.css';
import Upload from './components/upload/upload';
import Header from './components/header/header';

const App = () => {
  return (
    <div className="flex flex-col bg-gray-600 m-12 rounded-xl shadow-xl relative justify-center">
      <Header />
      <Upload debug={false} />
    </div>
  );
}

export default App;
