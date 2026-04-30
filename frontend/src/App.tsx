import './App.css';
import { Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';

const App = () => (
    <Routes>
        <Route path="/register" element={<RegisterPage />} />
    </Routes>
);

export default App;