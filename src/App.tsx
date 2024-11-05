import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Auth } from './components/Auth';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { Weather } from './components/Weather';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import { logout } from './store/authSlice';
import { LogOut } from 'lucide-react';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user}</span>
            <button
              onClick={() => dispatch(logout())}
              className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition duration-200"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Weather />
        <TodoInput />
        <TodoList />
      </main>
    </div>
  );
};

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return isAuthenticated ? <Dashboard /> : <Auth />;
};

const AppWrapper: React.FC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;