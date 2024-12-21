# Artly

![main-image](documentation/images/features/am-i-responsive.jpeg)

(By Laura Kondrataite)

Are you looking for a place where to sell your art? Or perhaps you wish to purchase a piece of artwork from a local/independent artists? Then look no further!

**Artly** is a product comparison site which promotes sharing most beloved artworks with like minded people. Whether you are looking to sell or buy a unique pieces of art, Artly promotes a is led by arts community who wishes to share and sell their artwork.

**Please note:** This repository is for the front-end part of Artly React project which was created as part of a web development course with Code Institute. To see the back-end repository for this project click [here](https://github.com/laurakond/artly-api).

Live **Artly** site can be found [here](https://artly-a211b809ae81.herokuapp.com/).

## Table of Contents

[Design](#design)
- [Target Audience](#target-audience)
- [User Stories](#user-stories)
- [Flowcharts](#flowcharts)
- [Wireframes](#wireframes)
- [Color palette](#color-palette)
- [Font styles](#font-styles)

[Agile Methodology](#agile-methodology)
- [GitHub Project Management](#github-project-management)

[Features](#features)
- [Existing Features](#existing-features)
- [Features Left to Implement](#features-left-to-implement)

[Technologies used](#technologies-used)
- [Languages](#languages)
- [Frameworks and Libraries](#frameworks-and-libraries)
- [Databases](#databases)
- [Other Tools, technologies, packages](#other-tools-technologies-packages)

[Testing](#testing)

[Deployment](#deployment)
- [Github](#github)
    - [How to Fork](#how-to-fork)
    - [How to Clone](#how-to-clone)
- [Heroku](#heroku)

[Credits](#credits)
- [Content](#content)
- [Used code](#used-code)
- [General resources](#general-resources)
- [Acknowledgments](#acknowledgments)
- [Code inspiration](#code-inspiration)
- [References](#references)

[Return to Table of Contents](#table-of-contents)

## Design
### Target Audience

The primary target audience for the website is:
- persons of any gender aged 16+ who enjoy art,
- artists who wishes to share their work,
- art connoiseurs who are looking for alternative ways in selling owned artwork.

No background, geographical location or income has been specified for the target audience. 

### User Stories

|    | As a Developer                                                                                                                                                |
| -- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [1](https://github.com/laurakond/artly/issues/1)  | As a developer I can set up a new workspace for front-end so that I can start working on my project.                                                          |
| [2](https://github.com/laurakond/artly/issues/2)  | As a developer I can deploy the front-end repository to Heroku so that it is accessible online.                                                               |
| [3](https://github.com/laurakond/artly/issues/3)  | As a developer I can add a favicon so that the website renders appropriate image in the browser.                                                              |
| [4](https://github.com/laurakond/artly/issues/4)  | As a developer I can add main website keywords and description so that the website gains higher searchability in the search engines.                          |
| [5](https://github.com/laurakond/artly/issues/5)  | As a developer I can apply design of choice so that the website is visually appealing and represents the purpose.                                             |
| [6](https://github.com/laurakond/artly/issues/6)  | As a developer, I can carry out website design improvement so that I know the project adheres to the principles of UX/UI design.                              |
| [7](https://github.com/laurakond/artly/issues/7)  | As a developer, I can note the website progression in the front-end README so that anyone can see the steps and actions taken for the release of the website. |
| [8](https://github.com/laurakond/artly/issues/8)  | As a developer, I can fix the bugs for the front-end so that I can ensure any issues are handled before the initial project release.                          |
| [9](https://github.com/laurakond/artly/issues/9)  | As a developer, I can carry out user stories testing so that I know all main user criteria and MVP are met.                                                   |
| [10](https://github.com/laurakond/artly/issues/10) | As a developer, I can perform manual tests for front-end so that I know all functionalities of the website are working.                                       |
| [11](https://github.com/laurakond/artly/issues/11) | As a developer, I can validate each page and app for front-end so that I know that the code adheres to best practices.                                        |

<br>


|    | As a First time user                                                                             |
| -- | ------------------------------------------------------------------------------------------------ |
| [12](https://github.com/laurakond/artly/issues/12) | As a first time user I can create an account so that I can sign in and access member's features. |

<br>


|    | As a site user                                                                                                                           |
| -- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [13](https://github.com/laurakond/artly/issues/13) | As a site user I can login to & logout of the website so that I can access functionality for logged in users.                            |
| [14](https://github.com/laurakond/artly/issues/14) | As a site user I can view the navbar from every page so that I can navigate easily between pages.                                        |
| [15](https://github.com/laurakond/artly/issues/15) | As a site user I can see a list of posted artworks on the home page so that I can clearly see the latest posts that have been published. |
| [16](https://github.com/laurakond/artly/issues/16) | As a logged in user I can create my own artwork post so that I can share it with others and sell it.                                     |
| [17](https://github.com/laurakond/artly/issues/17) | As a site user I can edit the artwork post so that I can show the most up to date information.                                           |
| [18](https://github.com/laurakond/artly/issues/18) | As a site user I can delete the artwork post so that it is no longer visible on the website for others to see.                           |
| [19](https://github.com/laurakond/artly/issues/19) | As a site user I can access a detailed artwork post so that I can read more about it.                                                    |
| [20](https://github.com/laurakond/artly/issues/20) | As a buyer I can make a bid the artwork so that I can buy it.                                                                            |
| [21](https://github.com/laurakond/artly/issues/21) | As a buyer I can delete my bid so that I can control removal of my bid for the artwork’s post.                                           |
| [22](https://github.com/laurakond/artly/issues/22) | As a seller I can review pending bids so that I can decide which seller to sell the artwork to.                                          |
| [23](https://github.com/laurakond/artly/issues/23) | As a seller I can set the artwork page as sold so that it is clear to the buyers the artwork is sold.                                    |
| [24](https://github.com/laurakond/artly/issues/24) | As a seller I can get in touch with the buyer to organise the collection of the artwork.                                                 |
| [25](https://github.com/laurakond/artly/issues/25) | As a logged in user I can update my profile so that I can keep it up-to-date with most relevant information.                             |
| [26](https://github.com/laurakond/artly/issues/26) | As a logged in user I can save the artwork post so that I can access them in one place.                                                  |
| [27](https://github.com/laurakond/artly/issues/27) | As a site user I can search for artworks by keyword or filter by category/style so that I can find listings relevant to my interests.    |
| [28](https://github.com/laurakond/artly/issues/28) | As a site user, I can see notification messages so that I know that my action was successful/completed.                                  |
| [29](https://github.com/laurakond/artly/issues/29) | As a site user I can see most popular artwork posts displayed on each page so that I can view their profiles.                            |
| [30](https://github.com/laurakond/artly/issues/30) | As a site user I can submit a contact form to site admins so that I can report any issues with the website.                              |
| [31](https://github.com/laurakond/artly/issues/31) | As a developer, I can perform automated tests for front-end so that I know all functionalities of the website are working.               |

<br>

### Flowcharts
I used [Lucidchart](https://lucid.app/) for creating the ERD for the models and [Exslidraw](https://excalidraw.com/) for creating site navigation.

- ERD:

    ![Project Models](documentation/images/entity_relational_diagram/model-chart.png)

- MVP flowchart:

    ![flowchart-mvp](documentation/images/entity_relational_diagram/site-navigation.png)

### Wireframes
The following wireframes show the initial idea of how the website would look on different devices: mobiles, tablets/iPads and laptops/desktops. 

[]()

### Color palette
The following palette was used to ensure the contrast is achieved between the main parts of the website:

<details>
    <summary>Color palette images</summary>


</details>

<br>


### Font styles
I used [Google fonts](https://fonts.google.com/) to source the fonts for the website. These are:


![font screenshots](documentation/design/fonts.jpeg)

[Return to Table of Contents](#table-of-contents)


## Agile Methodology

### GitHub Project Management

  ![GitHub Project Management](documentation/images/agile/project-board.jpeg)

- [GitHub Project board](https://github.com/users/laurakond/projects/12) was used to manage the progress and development of this project.
- It allowed me to scope the project and keep track of progress, sometimes revising estimated dates and tasks that were needed to be done by a certain point. 

![GitHub Project Management](documentation/images/agile/finished-board.png)

- I chose the "trafic-light" color scheme for the MoSCoW method in order to indicate which tasks were a priority (green must-haves) and which ones were not(red won't-haves) for my project board. 
    - This provided clarity and better understanding for myself as I was a sole project contributor.

[Return to Table of Contents](#table-of-contents)


## Features
### Existing Features

**The Header**
- Featured across all the pages, the Header is fully responsive and presents the user with the main pages that are required. To the left of the header you find:
    - The Logo

- To the right of the header the remainder of the pages:
    - Home Page
    - About Page
    - Tutorial List Page
    - Register Page
    - Login Page

    ![header](documentation/images/features/navigation.jpg)

- Upon Registration or Log in, the user's log in name and additional two pages are revealed in the header. This creates a sense of personalisation and indicates additional website functionality for the registered users.
    - Book Tutorial Page
    - My Tutorials Page

    ![loggedin header](documentation/images/features/logged-in-navigation.png)

**The Footer**
- The Footer features social media links that are related to the website and provides a copyright line indicating that this website was created for educational purposes only.
    ![footer](documentation/images/features/footer.jpg)
    - The instagram account displayed in the footer refers to the site owner's/my personal instagram account that showcases cross-stitch projects which is related to the aim of the project. It is slightly different to the LinkedIn and Github accounts as it does not relate to my web development journey.

**User authentication**


### Features Left to Implement

[Return to Table of Contents](#table-of-contents)

## Technologies used
### Languages

- JavaScript: the primary language used to develop interactive components of the website and handle click events.
- HTML: the markup language used to create the website.
- CSS: the styling language used to style the website.
- Markdown: the markup language to create the README and TESTING files.

### Frameworks and Libraries
- [Django](https://www.djangoproject.com/) Python framework for the overall project logic implementation.
- [React Bootstrap](https://react-bootstrap-v4.netlify.app/) CSS framework that allowed to implement various styled elements, including modals. It was also used for quick and easy styling of the overall website.

### Databases
- PostgreSQL: the database used to store all the data.
- Sqlite3: the database used for automated testing. 

### Other tools, technologies, packages

- [GitHub](https://github.com/) was used for creating and storing files and folders of the website.
- [Heroku](https://www.heroku.com) was used for accessing and storing my application game.
- **Git** was used for version control.
- **Pip** was used to install required dependencies.
- **Gitpod** editor was used for writing the code.
- **Gunicorn** webserver used to run the website.
- [JS Hint](https://jshint.com/) was used for validating Javascript code.
- [W3C Markdown](https://validator.w3.org/) was used for validating html files.
- [W3C CSS](https://jigsaw.w3.org/css-validator/) was used for validating css files.
- [Lucidchart](https://lucid.app/) and [Exslidraw](https://excalidraw.com/) was used for creating the website flowcharts.
- [Balsamiq](https://balsamiq.com/) used for creating wireframes.
- [Google Fonts](https://fonts.google.com/) for choosing appropriate fonts
- [Favicon](https://favicon.io/) for generating a favicon
- Google Chrome DevTools for testing, troubleshooting and brainstorming code solutions
- [Am I Responsive?](https://ui.dev/amiresponsive) website for showing the website's responsiveness on different devices
- [Coolors](https://coolors.co/) for generating the color palette
- WCAG color contrast checker for website accessibilty
- Wave evaluation tool for giving visual feedback about the accessibility of the website
- [Contrast Grid](https://contrast-grid.eightshapes.com/) to test chosen color palette

Full list of dependencies used for the project can be found in the requirements.txt file. 

 [Return to Table of Contents](#table-of-contents)

## Testing

The website went through extensive testing during the development and deployment stages. 
- See [TESTING.md](TESTING.md) file for full testing and validation information.


[Return to Table of Contents](#table-of-contents)


## Deployment
This website was deployed using GitHub pages and Heroku website. To deploy the project, follow the steps below:

### Github
1. Login to GitHub and navigate to the main repository page.
2.  Click on the chosen repository,for example [Stitch Art Guides](https://github.com/laurakond/Stitch-Art-Guides-pp4).
3. Once inside the repository, click on the "Settings" tab above the repository title displayed around the middle of the page.
4. Select "Pages" tab on the left side navigation menu.
5. Select "main" or "master" branch under "Build and Deployment", then "root" folder and click "save" button.
6. The GitHub page site will be deployed.
    - It might take a few minutes to generate the "live" website link.

The live link to the website can be found [here](https://stitch-art-guides-pp4-5a679feed1e1.herokuapp.com/).

#### How to Fork
To fork the repository in Github:
1. Follow steps 1 & 2 as above. 
2. Once inside the chosen repository, click the "fork" button in the top right corner above the "About section".

#### How to Clone
To clone the repository in Github:
1.  Follow steps 1 & 2 as in the deployment section above.
2.  Click on the "Code" button (often a bright color that stands out) at the top right corner just above the "commits" history. 
    - Select whether you would like to clone with HTTPS, SSH or GitHub CLI and copy the link shown.
3.  Open the terminal in your chosen code editor and change the current working directory to the location you want to use for the cloned directory.
    - Type 'git clone' into the terminal and then paste the copied link and press enter.
    - OR, if working with VSCode, select "Clone Git Repository" and save the file on your device as prompted.
4. If you are working on a local IDE such as VS code, you need to create a virtual environment:
    - in the terminal write the command `python -m venv [directory-name]`
    - To activate the virtual environment write `[directory-name]/Scripts/Activate`
    - If you need to deactivate it, type `deactivate` in the terminal
    - remember to include this to the .gitignore file
5. Next, create an env.py file where you will keep your key data and make sure it is included in the .gitignore file. Key data can include:
    - DATABASE_URL
    - SECRET_KEY
    - CLOUDINARY_URL
    - SITE_OWNER_EMAIL
    - SITE_OWNER_PASSWORD
6. Import all the dependencies required for the project to run. You can do so by entering `pip install -r requirements.txt` for the VSCode or `pip3 install -r requirements.txt` for Gitpod IDE.
7. Set up a database using postgreSQL.

### Heroku
To deploy to the Heroku website, follow the steps below:

- Navigate to [Heroku](https://www.heroku.com) platform website ang log in or create an account.
- Click 'Create new App'.
- Choose a unique project name and select your region from the drop down.
- Select 'Deploy' tab.
- Select 'Github' (or other platform if you are using another one) in the Deployment method section to connect to Heroku.
- Type out your project name in the 'Connect to Github' section and select your project repository
- Once connected, scroll to the bottom and click 'Deploy Branch' button
- When it has finished deploying, click on the 'View' button below or 'Open App' at the top right corner
- If the deployment was successful you will be taken to the deployed site. 

[Return to Table of Contents](#table-of-contents)

## Credits

### Content

### Used code

- To resolve a sticky error message I used the following code from the [Medium](https://medium.com/@rbscoop2611/most-efficient-way-to-add-warning-messages-under-forms-input-field-472f2b70bb72) article (also noted in the TESTING.md Bugs section).

    ```Python
            if (errors[name]) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: null
                }));
            }
    ```

### General resources:

#### React tutorials
- [Net Ninja Full React Tutorial](https://www.youtube.com/watch?v=XW0t2lk4Ffo&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=39)

#### React error handling
- [Most efficient way to add warning messages](https://medium.com/@rbscoop2611/most-efficient-way-to-add-warning-messages-under-forms-input-field-472f2b70bb72)
- [React hook form erros](https://daily.dev/blog/react-hook-form-errors-not-working-troubleshooting-tips#:~:text=and%20simplifying%20schema.-,Ensure%20Errors%20are%20Passed%20to%20Inputs,the%20error%20message%20when%20present)
- [React docs](https://legacy.reactjs.org/docs/error-boundaries.html)

#### Form validation
- [FeeCodeCamp: How to validate forms in react](https://www.freecodecamp.org/news/how-to-validate-forms-in-react/)

#### Creating search by categories
- [How to implement multiple filters in react](https://www.geeksforgeeks.org/how-to-implement-multiple-filters-in-react/)
- [How do you use multiple useEffect in a component](https://www.geeksforgeeks.org/how-do-you-use-multiple-useeffect-in-a-component/)
- [One or many useEffect hooks](https://stackoverflow.com/questions/54002792/in-general-is-it-better-to-use-one-or-many-useeffect-hooks-in-a-single-component)
- [Search category filter](https://medium.com/@josephtran_24702/creating-your-reactjs-app-with-search-category-filter-feature-aab62c60363f)

#### Toastify
- [Toastify documentation](https://www.npmjs.com/package/react-toastify/v/9.0.3)
- [Toastify guides](https://fkhadra.github.io/react-toastify/category/guides)
- [Dead simple chat team - Toastify complete guide](https://deadsimplechat.com/blog/react-toastify-the-complete-guide/#creating-a-basic-toast-notification)
- [Geshan Manandhar - beginner's guide to using Toastify](https://geshan.com.np/blog/2023/05/react-toastify/)
- [Geeks for Geeks react toastify](https://www.geeksforgeeks.org/reactjs-toast-notification/)
- [Logrocket - using react toastify](https://blog.logrocket.com/using-react-toastify-style-toast-messages/)


### Acknowledgments

My thanks go to: 
- My mentor [Iuliia Konovalova](https://github.com/IuliiaKonovalova) 
- My fellow student, [Vernell Clark](https://github.com/VCGithubCode), for troubleshooting problematic parts of code and providing a shoulder to cry on when things got really rough.

- [Daisy McGirr](https://github.com/Dee-McG) for helpig to crystalise the project idea, troubleshooting and providing moral support throughout the whole project.

### Code Inspiration
- I used Code Institute's Moments walkthrough as the base for my project.

### References


[Return to Table of Contents](#table-of-contents)