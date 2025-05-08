import { Routes, Route, Navigate } from 'react-router';
import { BaseLayout } from '@options/layouts';

import About from '@options/views/About';
import General from '@options/views/General';
import Profile from '@options/views/Profile';
import Transfer from '@options/views/Transfer';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<Navigate to="about" replace />} />
        <Route path="general" element={<General />} />
        <Route path="transfer" element={<Transfer />} />
        <Route path="about" element={<About />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="*" element={<About />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
