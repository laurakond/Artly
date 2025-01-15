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

[Return to Table of Contents](#table-of-contents)

## Design

### Target Audience

The primary target audience for the website is:

- persons of any gender aged 16+ who enjoy art,
- artists who wishes to share their work,
- art connoiseurs who are looking for alternative ways in selling owned artwork.

No background, geographical location or income has been specified for the target audience.

### User Stories

|                                                    | As a Developer                                                                                                                                                |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [1](https://github.com/laurakond/artly/issues/1)   | As a developer I can set up a new workspace for front-end so that I can start working on my project.                                                          |
| [2](https://github.com/laurakond/artly/issues/2)   | As a developer I can deploy the front-end repository to Heroku so that it is accessible online.                                                               |
| [3](https://github.com/laurakond/artly/issues/3)   | As a developer I can add a favicon so that the website renders appropriate image in the browser.                                                              |
| [4](https://github.com/laurakond/artly/issues/4)   | As a developer I can add main website keywords and description so that the website gains higher searchability in the search engines.                          |
| [5](https://github.com/laurakond/artly/issues/5)   | As a developer I can apply design of choice so that the website is visually appealing and represents the purpose.                                             |
| [6](https://github.com/laurakond/artly/issues/6)   | As a developer, I can carry out website design improvement so that I know the project adheres to the principles of UX/UI design.                              |
| [7](https://github.com/laurakond/artly/issues/7)   | As a developer, I can note the website progression in the front-end README so that anyone can see the steps and actions taken for the release of the website. |
| [8](https://github.com/laurakond/artly/issues/8)   | As a developer, I can fix the bugs for the front-end so that I can ensure any issues are handled before the initial project release.                          |
| [9](https://github.com/laurakond/artly/issues/9)   | As a developer, I can carry out user stories testing so that I know all main user criteria and MVP are met.                                                   |
| [10](https://github.com/laurakond/artly/issues/10) | As a developer, I can perform manual tests for front-end so that I know all functionalities of the website are working.                                       |
| [11](https://github.com/laurakond/artly/issues/11) | As a developer, I can validate each page and app for front-end so that I know that the code adheres to best practices.                                        |

<br>

|                                                    | As a First time user                                                                             |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [12](https://github.com/laurakond/artly/issues/12) | As a first time user I can create an account so that I can sign in and access member's features. |

<br>

|                                                    | As a site user                                                                                                                           |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
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

### Wireframes

The following wireframe report show the initial idea of how the website would look on different devices: mobiles, tablets/iPads and laptops/desktops.

- [Full Wireframe report](documentation/docs/artly-wireframes.pdf)

### Color palette

The following palette was used to ensure the contrast is achieved between the main parts of the website:

- #82204a - Murrey - for emphasising clickable words, i.e. Sign up, and font awesome icons, buttons
- #82204a4a - a variation ofthe above for the top sellers scroll bar color
- #f4442e - Cinnabar - for the active class, logo splash, sold ribbon, hover effects
- #f4452ecb - variation of the above for the button border color
- #273c2c - Dark green - for the image container background
- rgba(39, 60, 44, 0.25) - rgba color of the above for the box shadow effect
- #090c02 - Smokey black - for the main font color
- #F9F8F8 - Seasalt - for the main background and light font color
- #E7C69E - Sunset - for the upload image frame
- #FFFFFF - default card background color resused for the form backgrounds
  -rgba(255, 255, 255, 0.8) - rgba equivalent of the above white for the button colors (came with the style)
- #ced4da - French grey - default border color

  ![Color palette 1](documentation/images/design/colorpalette.jpg)
  ![Color palette 2](documentation/images/design/colorpalette2.jpg)

<br>

### Font styles

I used [Google fonts](https://fonts.google.com/) to source the fonts for the website. These are:

- Gothic - was used for the website logo.

![logo](documentation/images/features/pp5-logo.jpg)

- Montserrat, serif - was used as the main text font.
- Poppins, system-ui - was used for the accent text such as form labels.

![font screenshots](documentation/images/design/google-fonts-artly.jpg)

[Return to Table of Contents](#table-of-contents)

## Agile Methodology

### GitHub Project Management

![GitHub Project board](documentation/images/design/pp5-project-board.jpg)

The project was completed using Agile methodology. I have used one Project board for both the API and Front-end repositories in order to keep track of the progress, sometimes revising estimated dates and tasks that were needed to be done by a certain point.

The link to the project board can be found [here](https://github.com/users/laurakond/projects/14).

- I chose the "trafic-light" color scheme for the MoSCoW method in order to indicate which tasks were a priority (green must-haves) and which ones were not(red won't-haves) for my project board.
  - This provided clarity and better understanding for myself as I was a sole project contributor.

I used the same Milestones, Epics and labels within the API and Front-end repositories to help organise front-end and back-end user stories. This allowed me to keep track of the progress and ensure that the project MVP was completed in time.

MoSCoW methodology was used to map out which features were required for the MVP, and only address the others if there was sufficient time left.

![Finished Project board]()

**Epics**
The Epics have been covered in the back-end Artly-api README.md, which can be found [here](https://github.com/laurakond/artly-api?tab=readme-ov-file#github-project-management).

**Front-end Milestones**

- **Milestone 1:** Project board
  - Set up a project board.
- **Milestone 5:** Navigation
  - Display the navbar from every page.
- **Milestone 6**: Registration
  - Create an account
  - Log in and log out
- **Milestone11:** Front-end initial set up
  - Set up a new workspace for frontend.
  - Add favicon and boilerplate.
- **Milestone12**: Front-end Artwork CRUD functionality
  - View artwork listings on the homepage.
  - Access detailed artwork posts.
  - Create, edit, delete artwork posts.
- **Milestone13:** Front-end Offer Crud functionality
  - Make offers for artwork.
  - Review pending offers.
- **Milestone14:** Front-end Profile CRUD functionality(optional)
  - View user profile
  - Edit user profile
  - Delete user profile
- **Milestone15:** Front-end Save CRUD functionality(optional)
  - Save a post for future reference
  - Remove saved post
  - View saved posts in Saved component
- **Milestone16:** Front-end Contact CRUD functionality(optional)
  - Submit contact form to admin
- **Milestone17:** Testing & bug fixes
  - Perform automated and manual tests for front-end.
  - Fix front-end bugs.
- **Milestone18:** Front-end Readme & Testing files
  - Validate each front-end page and app.
  - Document the progress in the README and TESTING files
- **Milestone19:** User feedback
  - Receive notifications upon completed task
- **Milestone20**: Website design
  - Improve website UX/UI

[Return to Table of Contents](#table-of-contents)

## Features

### Existing Features

- The website was designed using React framework which allows seamless navigation and trasition between pages without having to refresh/reload the pages.
- Majority of the website features are available to any user regardless of their registration status.

**Logo and favicon**

![favicon](documentation/images/features/pp5-favicon.jpg)
![logo](documentation/images/features/pp5-logo.jpg)

- Upon logging loading the website, the user is greeted by a creative Logo to the left of the Navigation bar, which indicates of the website's creative purpose.
- Similarly, the same theme of the favicon clearly signals which of the browser tabs the website is on.

**The Header**

- Featured across all the pages, the Header is fully responsive and presents the user with the main pages that are required. To the left of the header you find:

- The Logo
- To the right of the header the remainder of the pages:

  - Home Page
  - Sign In
  - Sign Up

  **Mobile**

  ![mobile logged out navbar](documentation/images/features/mobile-navbar.jpg)
  ![mobile expanded logged out navbar](documentation/images/features/mobile-navbar-exp.jpg)

  **Desktop**

  ![desktop logged out navbar](documentation/images/features/desktop-navbar.jpg)
  ![desktop logged in navbar](documentation/images/features/desktop-navbar-user.jpg)

- Upon Registration or Log in, the user's profile avatar and additional four pages and a Sign out are revealed in the header. This creates a sense of personalisation and indicates additional website functionality for the registered users.

  - List Art Page
  - Saved Page
  - Followed Page
  - Profile Avatar
  - Log out Page

  **Mobile**

  ![mobile logged in navbar](documentation/images/features/mobile-navbar-user.jpg)

  **Desktop**
  ![desktop logged in navbar](documentation/images/features/desktop-navbar-user.jpg)

**The Landing Page**

- The Landing page of the website is designed to clearly indicate the purpose upon first visit. The user can straight away see all artworks that have been listed for sale.
- Arranged in a card view, each artwork listing provides the most essential information and can be clicked to access the detailed view of the artwork.
  - Tooltips have been used to provide useful information to the user upon hovering over the icons:
    - the save artwork feature is only available to the registered users.
- The user can see a list of top selling profiles, and search/filter functionality that allows them to search and filter the list view based on the following criteria:

  - Search bar for artworks, artist name, username
  - Filter by Artwork style
  - Filter by Artwork type
  - Filter by Artwork's sold status:

    - the sold artworks are marked with a Sold label that clearly indicates their unavailability for purchase

    ![Mobile Artwork list view](documentation/images/features/mobile-artwork-list.jpg)
    ![Desktop Artwork list view](documentation/images/features/desktop-artwork-list.jpg)

**Create Artwork form(restricted access)**

- Upon registration or logging in, the user can create an artwork by clicking on "List Art" in the navigation bar.
- The user will be taken to a form where they can choose to upload an image, and enter information about the artwork.
  - If the user enters incorrect information or leaves a required field empty, an error message will appear indicating so.
  - If the user uploads an image that exceeds the limit, an error message will appear indicating so.
- Once the artwork form is submitted, the user will see a confirmation message on the top right corner.
  - If the user clicks on the cancel button, they will be taken back to the previous page.

![Artwork form image]()

**Artwork detail view**

- Upon clicking on an individual artwork card, the user is taken to a detailed artwork page that displays full information on the artwork, including the style, type, contact details of the seller and the location of the artwork.
- Once logged in, the user can edit or delete their artwork listing by clicking on an icon (pictured below).

  - If the user chooses to edit the artwork, they are taken to the artwork edit form.
  - If the user chooses to delete the artwork, they will be notified by a pop up notification if the action was successful or not.

  ![Artwork detail view]()

  ![User edit icon]()

**Create Artwork form(restricted access)**

- If the user chooses to edit the form in the detailed artwork view, they are taken to the artwork edit form, which is the same as Artwork create form. The user will be able to see preexisting information populated in the fields, and amend them accordingly.
- Similarly to the Artwork create form, the user can either submit or cancel the edit.

  - Upon successful update, the user will see a notification message appear and they will be taken to the artwork detail view where they can review the information.

  ![Edit Artwork form image]()

**Artwork bid feature(restricted access)**

- When inside the detailed artwork view, the user can choose to bid(buy) on an artwork if the artwork is not their own.

  - A bid form is visible underneath the main artwork information where the user needs to enter the bid price and their contact details.

    - The bid form is only visible to the users who are the buyers, i.e. not the owners of the artwork listing.
    - The form validates incorrect data input including negative or 0 value price offers.
      - an error message will appear accordingly.
    - Upon bid submission the user will be notified if the action was successful or not.
    - The user's bid and bid status will appear below the bid form, also showing when the bid was created. This allows for the users to track the progress and see when other bids were submitted too.

    ![buyers submitted bid view]()

- If the user wishes to remove their bid, they can delete it.

  - Similarly to the artwork delete, a notification will indicate if the action was completed or if there were any errors.

  ![delete bid]()

- Once the bid is submitted, the seller can then access the artwork detail view to update the bid status.

  - There are three options visible to choose from:

    1. Approve the bid
    2. Reject the bid
    3. Mark as sold

    ![Bid button options]()

  - Upon any of these, the bid status view will update for the buyer and seller to see.
  - If the Bid is marked as sold, the artwork automatically updates to being sold with a "Sold" ribbon appearing on the top right corner of the artwork card, and a call to action button is revealed to the seller to "Contact the buyer".

    ![Sold ribbon]()

    - Once clicked, a mailto functionality will be activated in a separate window.
    - If there are any other bids for the artwork, their bid status is hidden to indicate which of the bid was accepted.

      ![mailto]()

    - If a buyer enters the sold artwork's detailed view, the bid form is no longer displayed.
    - Once the artwork is marked as sold, the seller cannot edit the listing.

**Saved artworks(restricted access)**

- In the navigation, the user can access their saved artworks if they wish to review them in one place.
- The list of artworks is rendered the same way as the main artwork list.

**Followed users(restricted access)**

**Profile view**

**Edit Profile form(restricted access)**

**Change username form(restricted access)**

**Change password form(restricted access)**

**Avatar feature**

- The Avatar is implemented throughout the website and plays a crutial part in the functionality of it.
  - It provides a visual aid to the user easing to differentiate artworks and profiles they are viewing.

**Default images**

- The artwork and profile features come with a preset default image in case the user has not chosen or updated the images.

  - This way other features, such as the artwork view and the Avatar view, can function without an issue.

  ![artwork default]()
  ![profile default]()

**Top sellers view**

**Search/Filter feature**

- The search and filter feature is implemented throughout the website, which allows the user to look for their preferred artwork at ease.

**Error page**

- have been added to troubleshoot appropriate server response to user request.

![404 error page]()

**User authentication**

<details>
<summary>Sign Up</summary>

- The Sign Up form allows the user to create an account in order to access additional features:

  - Artwork create/edit/delete
  - Bid create/edit/delete
  - Save artworks
  - Follow other users
  - Edit Profile

        - Upon successful registration, a confirmation message is displayed at the top of the page and the user is redirected to the home page.
        - The user's profile avatar is also visible at the top of the navigation bar.

        ![Sign Up]()

    </details>

<details>
<summary>Sign In</summary>

- The Sign in form allows the user to access their account and manage the above mentioned features.
- Upon successfull sign in, a confirmation message is displayed at the top of the page and the user is redirected to the home page.
- The user's profile avatar is also visible at the top of the navigation bar.

      ![login]()

  </details>

 <details>
    <summary>Sign Out</summary>

- When the user wishes to leave the account the logout button enables a confirmation page ensuring that the user is informed of their actions. - Upon successful logout, a confirmation message is displayed at the top of the page.

      ![logout]()

  </details>

**Restricted access**

- I have applied defensive programming to several features that are only accessible to the registered. These are:
  - Artwork edit/delete feature
  - Bid edit/delete feature
  - Save artwork feature
  - Profile edit/delete
  - Follow other users feature
- Upon an attempt to access any of these the following alert messages will be displayed:
  - If an unregistered user attempts to access any of the restricted pages by typing in the url link to the browser, they will be taken back to the main page view
  - I have used front-end to ensure that restricted content/feature is not accessible to unregistered users, thus minimising any errors or access breach.

**Notification messages**

<details>
    <summary>User registration/access</summary>

![Successful sign in]()
![Successful registration]()
![Successful signout]()

</details>

 <details>
    <summary>Confirmation messages</summary>

![Successful artwork submission]()
![Successful artwork delete]()
![Successful bid submission]()
![Successful bid delete]()
![Successful bid accept]()
![Successful bid reject]()
![Successful bid mark as sold]()

</details>

### Features Left to Implement

- in house messaging functionality which would allow the sellers and buyers to communicate in one place.
  - Notifications would be sent to the user's email to make sure that they are notified if any changes are made.
- Expand and improve on the Profile feature to separate the buyers' and sellers' profiles more prominently.
- Implement a contact form so that the users could inform administrators about any errors or bugs in the system.
- My Bids page, so that the buyers have easy access to the bids they a have placed and see the status of them in one place.
  - At the moment this feature can carried out if the user chooses to save an artwork.
  - This would allow to expand on the existing functionality of the saved artworks feature.
- Expand on and improve artwork edit functionality for the seller.

[Return to Table of Contents](#table-of-contents)

## Technologies used

### Languages

- JSX: the primary language used to develop interactive components of the website and handle click events.
- HTML: the markup language used to create the website.
- CSS: the styling language used to style the website.
- Markdown: the markup language to create the README and TESTING files.

### Frameworks and Libraries

- [React](https://react.dev/) framework for overall front-end logic and design.
- [React Bootstrap](https://react-bootstrap-v4.netlify.app/) CSS framework that allowed to implement various styled elements, including modals. It was also used for quick and easy styling of the overall website.

### Databases

- [Artly-api](https://artly-api-a39d790259f4.herokuapp.com/), created as part of the project to store the data.

### Other tools, technologies, packages

- [GitHub](https://github.com/) was used for creating and storing files and folders of the website.
- [Heroku](https://www.heroku.com) was used for accessing and storing my application game.
- **Git** was used for version control.
- **Pip** was used to install required dependencies.
- **Gitpod** editor was used for writing the code.
- [JS Hint](https://jshint.com/) was used for validating Javascript code.
- [W3C Markdown](https://validator.w3.org/) was used for validating html files.
- [W3C CSS](https://jigsaw.w3.org/css-validator/) was used for validating css files.
- [Balsamiq](https://balsamiq.com/) used for creating wireframes.
- [Google Fonts](https://fonts.google.com/) for choosing appropriate fonts
- [Favicon](https://favicon.io/) for generating a favicon
- Google Chrome DevTools for testing, troubleshooting and brainstorming code solutions
- [Am I Responsive?](https://ui.dev/amiresponsive) website for showing the website's responsiveness on different devices
- [Coolors](https://coolors.co/) for generating the color palette
- WCAG color contrast checker for website accessibilty
- Wave evaluation tool for giving visual feedback about the accessibility of the website
- [Canva](https://www.canva.com/) used for generating the Logo, favicon design and image upload defaults
- [Contrast Grid](https://contrast-grid.eightshapes.com/) to test chosen color palette
- [React Toastify](https://www.npmjs.com/package/react-toastify/v/9.0.3) for rendering user notifications

Full list of dependencies used for the project can be found in the package.json file.

[Return to Table of Contents](#table-of-contents)

## Testing

The website went through extensive testing during the development and deployment stages.

- See [TESTING.md](TESTING.md) file for full testing and validation information.

[Return to Table of Contents](#table-of-contents)

## Deployment

This website was deployed using GitHub pages and Heroku website. To deploy the project, follow the steps below:

### Github

1. Login to GitHub and navigate to the main repository page.
2. Click on the chosen repository,for example [Artly](https://artly-a211b809ae81.herokuapp.com/).
3. Once inside the repository, click on the "Settings" tab above the repository title displayed around the middle of the page.
4. Select "Pages" tab on the left side navigation menu.
5. Select "main" or "master" branch under "Build and Deployment", then "root" folder and click "save" button.
6. The GitHub page site will be deployed.
   - It might take a few minutes to generate the "live" website link.

The live link to the website can be found [here](https://artly-a211b809ae81.herokuapp.com/).

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

- Default image was supplied by [Flaticon](https://www.flaticon.com/).
  - I had to replace initial default image as it had a white border around it, which was visible after applying color choices.

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

- To add a corner ribbon for the Sold artwork, I adapted the following code from [Stackoverflow](https://stackoverflow.com/questions/30503866/right-corner-ribbon-on-a-div-css) thread:

  ```css
  .parent {
    overflow: hidden; /* required */
    width: 50%; /* for demo only */
    height: 250px /* some non-zero number */;
    margin: 25px auto; /* for demo only */
    border: 1px solid grey; /* for demo only */
    position: relative; /* required  for demo*/
  }

  .ribbon {
    margin: 0;
    padding: 0;
    background: rebeccapurple;
    color: white;
    padding: 1em 0;
    position: absolute;
    top: 0;
    right: 0;
    transform: translateX(30%) translateY(0%) rotate(45deg);
    transform-origin: top left;
  }
  .ribbon:before,
  .ribbon:after {
    content: "";
    position: absolute;
    top: 0;
    margin: 0 -1px; /* tweak */
    width: 100%;
    height: 100%;
    background: rebeccapurple;
  }
  .ribbon:before {
    right: 100%;
  }

  .ribbon:after {
    left: 100%;
  }
  ```

- bookmark positioning

  - when working on the Artwork component, I wanted to adjust the bookmark/save icon to the bottom right corner of the card. I managed to do this by applying the following code and adjusting it to fit the website needs: [W3Schools - image text bottom right](https://www.w3schools.com/css/tryit.asp?filename=trycss_image_text_bottom_right)

  ```css
  .container {
    position: relative;
  }
  .bottomright {
    position: absolute;
    bottom: 8px;
    right: 16px;
    font-size: 18px;
  }
  img {
    width: 100%;
    height: auto;
    opacity: 0.3;
  }
  ```

- I used [Get Css Scan](https://getcssscan.com/css-buttons-examples) website for sourcing button styles.
  - The code I appropriated to fit design needs was taken from Button 23 by Airbnb.

### General resources:

#### React tutorials

- [Net Ninja Full React Tutorial](https://www.youtube.com/watch?v=XW0t2lk4Ffo&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=39)
- [Web designer - Filter product list](https://www.youtube.com/watch?v=QXWMXWkaVeI)

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

#### Applying styles for conditional statements

- [React conditional styles make easy](https://www.dhiwise.com/post/react-conditional-styles-made-easy-best-practices)
- [Conditional styling React](https://owlcation.com/stem/conditional-styling-react)
- [Stackoverflow - correct way to handle conditional styling in React](https://stackoverflow.com/questions/35762351/correct-way-to-handle-conditional-styling-in-react)
- [Stackoverflow - how to change opacity of button in conditional rendering](https://stackoverflow.com/questions/66526935/how-to-change-opacity-of-button-in-conditional-rendering-in-react-native)

#### Conditional styles

- [React conditional styles](https://www.dhiwise.com/post/react-conditional-styles-made-easy-best-practices)

#### Flex-basis/object fit

- [Mozilla - flex basis](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis)
- [Stackoverflow-flex basis not acting as width](https://stackoverflow.com/questions/47581255/flex-basis-is-not-acting-as-width-when-set-within-display-flex-set-to-flex-dire)
- [Mastery - the different between width and flex basis](https://mastery.games/post/the-difference-between-width-and-flex-basis/)
- [Css Tricks - object fit](https://css-tricks.com/on-object-fit-and-object-position/)
- [Medium - sizing and moving image](https://medium.com/@1stforgottentoy/sizing-and-moving-your-image-in-a-container-f618d46a2547)

#### Scrollbar

- [Mdn web docs - overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
- [W3Schools](https://www.w3schools.com/css/css_overflow.asp)

#### substring()

- When working on the artwork list view, I noticed that the size of the card was changing depending on the length of the description provided. I used the substring() method to ensure the static card size.
  - [mdn web docs - substring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring)
  - [W3Schools - Javascript substring](https://www.w3schools.com/jsref/jsref_substring.asp)
- The following StackOverflow threads were really helpful at implementing the substring:
  - [How to use substring in react native](https://stackoverflow.com/questions/51279877/how-to-use-substring-in-react-native)
  - [How to use substring in react](https://stackoverflow.com/questions/62574400/how-to-use-substring-or-cut-strings-in-react)

#### Conditional Class rendering

- When building the bid component layout, I needed to activate certain classes based on conditions. I found the following Stack overflow threads and another article really helpful to understand how to do it:
  - [Add css classname dynamically in react loop based on condition](https://stackoverflow.com/questions/66767604/add-css-classname-dynamically-in-react-loop-based-on-condition)
  - [Conditionally applying class attributes in react](https://stackoverflow.com/questions/30533171/conditionally-applying-class-attributes-in-react)
  - [Dhwise - Mastering react add class conditionally](https://www.dhiwise.com/post/mastering-react-add-class-conditionally-a-comprehensive-guide)

### Acknowledgments

My thanks go to:

- My mentor [Iuliia Konovalova](https://github.com/IuliiaKonovalova)
- My fellow student, [Vernell Clark](https://github.com/VCGithubCode), for troubleshooting problematic parts of code and providing a shoulder to cry on when things got really rough.

- [Daisy McGirr](https://github.com/Dee-McG) for helpig to crystalise the project idea, troubleshooting and providing moral support throughout the whole project.

### Code Inspiration

- The project was inspired and based on some parts of Code Institute's Moments walkthrough [project](https://github.com/mr-fibonacci/moments).
  - Credits are also noted within the code.
- The bid functionality idea from the seller's perspective came from AsiaWi's Snap it up [project](https://github.com/AsiaWi/snap-it-up-frontend/tree/main).

[Return to Table of Contents](#table-of-contents)
