import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./api/AxiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import ArtworkCreateForm from "./pages/artworks/ArtworkCreateForm";
import ArtworkPage from "./pages/artworks/ArtworkPage";
import AllArtworksPage from "./pages/artworks/AllArtworksPage";
import { useLoggedInUser } from "./contexts/LoggedInUserContext";
import ArtworkEditForm from "./pages/artworks/ArtworkEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameEditForm from "./pages/profiles/UsernameEditForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import UserPasswordEditForm from "./pages/profiles/UserPasswordEditForm";
import PageNotFound from "./components/PageNotFound";

function App() {
  const loggedInUser = useLoggedInUser();
  const profile_id = loggedInUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container fluid className={styles.Main}>
        <ToastContainer autoClose={2000}></ToastContainer>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <AllArtworksPage message="No results found." />}
          />
          <Route
            exact
            path="/saved"
            render={() => (
              <AllArtworksPage
                message="No results found. Adjust the search keyword or save an artwork."
                filter={`saves__owner__profile=${profile_id}&ordering=-saves__created_at&`}
              />
            )}
          />
          <Route
            exact
            path="/followed"
            render={() => (
              <AllArtworksPage
                message="No results found. Adjust the search keyword or follow a profile."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route
            exact
            path="/artworks/create"
            render={() => <ArtworkCreateForm />}
          />
          <Route exact path="/artworks/:id" render={() => <ArtworkPage />} />
          <Route
            exact
            path="/artworks/:id/edit"
            render={() => <ArtworkEditForm />}
          />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameEditForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordEditForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route render={() => <PageNotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
