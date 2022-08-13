import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Game } from '../components/game';
import { Layout } from '../components/layout';

export const Main: FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="game/*" element={<Game />} />
        <Route path="*" element={<Navigate to={'/game'} />} />
      </Routes>
    </Layout>
  );
};
