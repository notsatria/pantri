import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppNav } from "./components/AppNav";
import { HomePage } from "./pages/HomePage";
import { SavedRecipesPage } from "./pages/SavedRecipesPage";

export default function App() {
  return (
    <BrowserRouter>
      <AppNav />
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<SavedRecipesPage />} path="/saved" />
      </Routes>
    </BrowserRouter>
  );
}
