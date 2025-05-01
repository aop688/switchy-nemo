import { Routes, Route } from 'react-router';
import { BaseLayout } from '@options/layouts';

import Home from '@options/views/Home';
import About from '@options/views/About';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<About />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
