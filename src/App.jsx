import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Activity from './pages/Activity';
import Diet from './pages/Diet';
import Goals from './pages/Goals';
import Profile from './pages/Profile';
import Water from './pages/Water';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {currentPage === 'dashboard' && <Dashboard setCurrentPage={setCurrentPage} />}
      {currentPage === 'activity' && <Activity />}
      {currentPage === 'water' && <Water />}
      {currentPage === 'diet' && <Diet />}
      {currentPage === 'goals' && <Goals />}
      {currentPage === 'profile' && <Profile />}
    </Layout>
  );
}

export default App;
