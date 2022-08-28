import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { GameContainer } from '../components/game';
import { Layout } from '../components/layout';

export const Main: FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<GameContainer />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
};
