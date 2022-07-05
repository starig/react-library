import React from 'react';
import Content from "./components/Content/Content";
import {Route, Routes} from "react-router-dom";
import BookPage from "./pages/BookPage";
import MainPage from "./pages/MainPage";

const App = () => {
    return (
        <Routes>
            <Route path={'/'} element={<MainPage />}>
                <Route path={''} element={<Content />} />
                <Route path={'/book/:id'} element={<BookPage />} />
            </Route>
        </Routes>
    )
}

export default App;
