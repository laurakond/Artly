import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../NavBar";
import { LoggedInUserProvider } from "../../contexts/LoggedInUserContext";

test("renders NavBar", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  const signInLink = screen.getByRole("link", { name: "Sign in" });
  expect(signInLink).toBeInTheDocument();
});

test("renders link to the user profile for a logged in user", async () => {
  render(
    <Router>
      <LoggedInUserProvider>
        <NavBar />
      </LoggedInUserProvider>
    </Router>
  );

  const profileAvatar = await screen.findByRole("img", {
    name: "avatar",
  });
  expect(profileAvatar).toBeInTheDocument();
});

test("renders sign in and sign up buttons on logout", async () => {
  render(
    <Router>
      <LoggedInUserProvider>
        <NavBar />
      </LoggedInUserProvider>
    </Router>
  );

  const signOutLink = await screen.findByRole("link", { name: "Sign out" });
  fireEvent.click(signOutLink);

  const signInLink = await screen.findByRole("link", { name: "Sign in" });
  const signUpLink = await screen.findByRole("link", { name: "Sign up" });

  expect(signInLink).toBeInTheDocument();
  expect(signUpLink).toBeInTheDocument();
});

test("renders link to the artwork create form", async () => {
  render(
    <Router>
      <LoggedInUserProvider>
        <NavBar />
      </LoggedInUserProvider>
    </Router>
  );

  const listArt = await screen.findByText("List Art");
  expect(listArt).toBeInTheDocument();
});

test("renders link to the saved artworks list view", async () => {
  render(
    <Router>
      <LoggedInUserProvider>
        <NavBar />
      </LoggedInUserProvider>
    </Router>
  );

  const savedArtworksList = await screen.findByText("Saved artworks");
  expect(savedArtworksList).toBeInTheDocument();
});

test("renders link to the followed profiles view", async () => {
  render(
    <Router>
      <LoggedInUserProvider>
        <NavBar />
      </LoggedInUserProvider>
    </Router>
  );

  const followedProfilesList = await screen.findByText("Followed profiles");
  expect(followedProfilesList).toBeInTheDocument();
});
