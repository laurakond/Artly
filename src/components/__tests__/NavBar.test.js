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
