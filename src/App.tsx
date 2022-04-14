import { AddForm } from './components/AddForm';
import { Header } from './components/Header';
import { MainScreen } from './components/MainScreen';
import Users from './components/Users/Users';


function App() {
  return (
    <div className="app bg-[#f8f8f8] flex items-center flex-col">
      <div className="w-full bg-white">
        <Header />
      </div>
      
      <div className="container max-w-[1024px] ">
        <MainScreen />

        <Users />

        <AddForm />
      </div>
      
    </div>
  );
}

export default App;
