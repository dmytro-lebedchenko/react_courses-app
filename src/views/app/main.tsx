import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { App } from './App';
import { store } from '../../services/app/store';
import { NotFoundPage } from '../pages/NotFoundPage';
import { HomePage } from '../pages/HomePage';
import { CoursePage } from '../pages/CoursePage';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="*" element={<NotFoundPage />} />
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="course/:courseId" element={<CoursePage />} />
        </Route>
      </Routes>
    </Router>
  </Provider>,
);
