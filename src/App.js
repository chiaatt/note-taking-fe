import React, { Suspense } from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Global
import NotFound from 'view/errorPages/NotFound';
import Loading from 'components/loading/Loading';
// Layout & Dashboard
import Layout from 'components/layout/Layout';
import NoteList from 'view/notes/NoteList';
import NoteNew from 'view/notes/NoteNew';
import Search from 'view/notes/Search';
import Login from 'view/Login';

import ProtectedRoute from 'util/ProtectedRoute';

function App() {

  return (
    <div className="App">
      <ToastContainer autoClose={false} transition={Zoom} style={{ marginTop: '50px' }} />
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route exact path="/" element={<Layout />}>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/notes" element={ <ProtectedRoute> <NoteList /> </ProtectedRoute>} />
              <Route exact path="/notes/new" element={<ProtectedRoute><NoteNew /></ProtectedRoute>} />
              <Route exact path="/notes/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />

              <Route exact path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
