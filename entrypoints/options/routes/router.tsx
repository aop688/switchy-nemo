import { Routes, Route } from 'react-router';
import { BaseLayout } from '@options/layouts';

import About from '@options/views/About';
import General from '@options/views/General';
import Home from '@options/views/Home';
import Transfer from '@options/views/Transfer';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<Home />} />
        <Route path="general" element={<General />} />
        <Route path="transfer" element={<Transfer />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<About />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
