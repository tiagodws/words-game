import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Game } from '../components/game';
import { Layout } from '../components/layout';

export const Main: FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
};
