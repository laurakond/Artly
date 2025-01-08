# Testing for Once Upon a Time

By Laura Kondrataite

## Contents

[Testing](#testing)

- [W3C Validator testing](#w3c-validator-testing)
- [JS Hint testing](#js-hint-testing)
- [Bugs](#bugs)
  - [Fixed bugs](#fixed-bugs)
  - [Unfixed bugs](#unfixed-bugs)
- [Lighthouse](#lighthouse-testing)
- [User stories testing](#user-stories-testing)
- [Accessibility](#accessibility)
- [Device testing](#device-testing)
- [User testing](#user-testing)
- [Manual testing](#manual-testing)
- [Restricted access testing](#restricted-access-testing)
- [Automated testing](#automated-testing)

## Testing

### W3C Validator Testing

All files were put through the official [W3C Markup Validation](https://validator.w3.org/) & [W3C Css Validation](https://jigsaw.w3.org/css-validator/) services. The initial check returned a few errors and warnings that were corrected and taken note of. Images of errors are enclosed below.

<details>
    <summary></summary>

</details>

**W3C Markup**:

**W3C CSS**:

### JS Hint Testing

[Return to Table of Contents](#contents)

## Bugs

### Fixed bugs

**error 400: request failed with status code 400**

![400 error image](documentation/images/errors/error-400-bidcreateform.png)

- I received a 400 error when testing the bid submission. The issue was to do with the phone number field type.
  - I resolved this by removing the field from the Bid model in the back-end as it was not crucial for the bid functionality.

**Bid price field error message would not hide once a new value was input**

![input validation](documentation/images/errors/input-validation.png)

- When testing the bid price input field, I noticed that the error message would not hide when a new bid value was written, even after the submission.
- I managed to resolve this by resetting the error state. I used this snippet of code from [Medium](https://medium.com/@rbscoop2611/most-efficient-way-to-add-warning-messages-under-forms-input-field-472f2b70bb72):
  ```Python
          if (errors[name]) {
              setErrors(prevErrors => ({
                  ...prevErrors,
                  [name]: null
              }));
          }
  ```

**Hide Bid component for the seller**

- When working on the Bid component display, I decided to hide the bid form from the users who were selling the artwork. This way the sellers were only able to see the submitted bids and avoid bidding on their own artworks.
  - I used `!artwork.results[0]?.is_owner` in the ternary condition to render the bid form for the buyers only.

**Concatenating url link**

![concatenation error](documentation/images/errors/concatenated-url-error.png)

- when testing my deployed react website, I noticed that the url for creating an artwork listing was broken. Upon each click on the “create artwork”, “artwork” would be concatenated at the end
- I managed to resolve this by adding a missing / at the beginning of the link path in the NavBar.js file.

**no image upload error**

![no-image-error.png](documentation/images/errors/no-image-error.png)

- When testing Artwork creation, I received the pictured error if no image was selected even though it was an optional field to submit.
  - I managed to resolve this by replacing the existing image related code in ArtworkCreateForm.js with this:
    ```jsx
    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }
    ```

**Distorted NavBar view**

- when styling the navbar I noticed that in the mobile view on smaller screens the proportions of the screen got distorted. This was because of the Most selling profile componenet was set to show 4 profiles. - I managed to resolve this problem by adding the below rules to the main App class in the App.js.
  - I have also reduced the number of profiles listed to 3, in order to prevent this error. However, I will be looking at implementing horizontal scrolling at the next development stage.
  ```css
  max-width: 100vw;
  overflow-x: hidden;
  ```

**Style and type filters returning non explicit data**

- I noticed that my style filter was returning entries for “other” for style and type of artwork.
  - I resolved this by replacing the "search=" with "style=" and "type=" in each useEffect for style and type. this seems to have resolved the issue.

**Artwork sold status not appearing straight away**

- Similarly, when testing my app, I noticed that the artwork was displaying sold status only after refreshing the page.
- I realised that I needed to update the artwork sold status in order to get the “Sold” statement appear upon clicking “Mark as sold” button.
  - I managed to get that working by altering the setBid code snippet to setArtwork snippet.
  - I found this part of React documentation useful: [React documentation - updating state](https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state)

### Unfixed bugs

- When testing the website, I noticed that there is a discrepancy in the artwork edit once it is sold fuctionality.
  - It appears that once the atwork is marked as sold, if the seller chooses to edit the artwork, it is listed again as if it was not sold in the artwork list view. However, the user doesn't seem to be able to interact with it afresh, which does not cause any issues apart from misleading and confusing information displayed to the user. - I have circumvented this issue by disabling the edit functionality for the seller once the artwork is marked as sold.
    [Return to Table of Contents](#contents)

### Lighthouse testing

Website performance, accessibility, best practices and SEO were tested using Lighthouse web performance testing tool. The tests were carried out using Google Chrome.

The scores have been marked down due to the use of external CDNs and Cloudinary storage.

<details>
<summary></summary>
</details>

[Return to Table of Contents](#contents)

### User stories testing

[Return to Table of Contents](#contents)

### Accessibility

The project was run through Wave evaluation tool and WCAG Colour contrast checker.

- No errors were detected when passing through Wave evaluation tool.
- I ensured that sufficient color contrast is provided when choosing the color palette. I used [Contrast Grid tool](https://contrast-grid.eightshapes.com/) to ensure that the colors are well-chosen.

  ![color contrast]()

[Return to Table of Contents](#contents)

### Device testing

The project was tested against the following devices and browsers:

- Google Chrome
- Google Chrome Dev
- Firefox
- Explorer
- Google Pixel 7
- Galaxy s10
- Galaxy Tab A
- iPhone 7

[Return to Table of Contents](#contents)

### User testing

The application was tested during the development and post-development stages. I have asked my friends and peers to notify me of any issues that might appear. No issues were reported/noted during the development and post-development.

[Return to Table of Contents](#contents)

### Manual testing

After the development stage of the application, I went through each feature, ensuring that the website is working as intended.
[Return to Table of Contents](#contents)

### Restricted access testing

I have implemented restricted access to specific content that is only allowed to the users who have a registered account.

[Return to Table of Contents](#contents)

### Automated Testing

- Automated testing has been implemented for the following:

[Return to Table of Contents](#contents)

[Return to the main README.md](README.md)
