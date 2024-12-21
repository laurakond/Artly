import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";

import "./api/AxiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import ArtworkCreateForm from "./pages/artworks/ArtworkCreateForm";
import ArtworkPage from "./pages/artworks/ArtworkPage";
import AllArtworksPage from "./pages/artworks/AllArtworksPage";
import { useLoggedInUser } from "./contexts/LoggedInUserContext";
import ArtworkEditForm from "./pages/artworks/ArtworkEditForm";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  // lines 17-18 are needed for filtering by saved artworks. Otherwise it is not 
  // required
  const loggedInUser = useLoggedInUser();
  const user_id = loggedInUser?.user_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <ToastContainer></ToastContainer>
        <Switch>
          <Route 
            exact
            path="/"
            render={() => <AllArtworksPage message="No results found."/> } 
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route 
            exact 
            path="/artworks/create" 
            render={() => <ArtworkCreateForm/>} 
          />
          <Route exact path="/artworks/:id" render={() => <ArtworkPage/> } />
          <Route exact path="/artworks/:id/edit" render={() => <ArtworkEditForm/> } />
          <Route render={() => <p>Page not found</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
