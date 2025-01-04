import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../NavBar";
import { LoggedInUserProvider } from "../../contexts/LoggedInUserContext";

test('renders NavBar', () =>{
    render(
        <Router>
            <NavBar/>
        </Router>
    );

    // screen.debug(); //works like clg
    const signInLink = screen.getByRole('link', {name: 'Sign in'})
    expect(signInLink).toBeInTheDocument();
});

test('renders sign in and sign up buttons on logout',  async () =>{
    render(
        <Router>
            <LoggedInUserProvider>
                <NavBar/>
            </LoggedInUserProvider>
        </Router>
    );

    const signOutLink = await screen.findByRole("link", { name: "Sign out" });
    fireEvent.click(signOutLink);

    const signInLink = await screen.findByRole("link", { name: "Sign in" });
    const signUpLink = await screen.findByRole("link", { name: "Sign up" });

    expect(signInLink).toBeInTheDocument();
    expect(signUpLink).toBeInTheDocument();
    screen.debug();
});