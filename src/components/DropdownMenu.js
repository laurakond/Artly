import React from "react";
import { useHistory } from "react-router";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/DropDownMenu.module.css";

// This code was appropriated from Code Institute's Moments walkthrough project.
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fa-solid fa-ellipsis"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

// This code snippet is applied for editing/deleting Artwork instances
export const DropdownMenu = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown drop="down">
      <Dropdown.Toggle as={ThreeDots} />

      <Dropdown.Menu
        popperConfig={{ strategy: "fixed" }}
        className={styles.CustomDropdownMenu}
      >
        <Dropdown.Item
          onClick={handleEdit}
          aria-label="edit"
          className={styles.DropdownItem}
        >
          <i className={`fa-solid fa-pen-to-square ${styles.DropdownItem}`}></i>
          Edit
        </Dropdown.Item>
        <Dropdown.Item
          onClick={handleDelete}
          aria-label="delete"
          className={styles.DropdownItem}
        >
          <i className="fa-solid fa-trash"></i>Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

// This code snippet is used for deleting buyer's bid
export const BuyerDropdownMenu = ({ handleDelete }) => {
  return (
    <Dropdown drop="down">
      <Dropdown.Toggle as={ThreeDots} />

      <Dropdown.Menu
        popperConfig={{ strategy: "fixed" }}
        className={styles.CustomDropdownMenu}
      >
        <Dropdown.Item
          onClick={handleDelete}
          aria-label="delete"
          className={styles.DropdownItem}
        >
          <i className="fa-solid fa-trash"></i>Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

/* This code snippet is used for editing the user's profile,
including username and password */
export function ProfileEditDropdown({ id }) {
  const history = useHistory();
  return (
    <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
      <Dropdown.Toggle as={ThreeDots} />
      <Dropdown.Menu
        popperConfig={{ strategy: "fixed" }}
        className={styles.CustomDropdownMenu}
      >
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit`)}
          aria-label="edit-profile"
          className={styles.DropdownItem}
        >
          <i className="fa-solid fa-pen-to-square"></i> Edit profile
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
          className={styles.DropdownItem}
        >
          <i className="fa-solid fa-address-card"></i>
          Change username
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
          aria-label="edit-password"
          className={styles.DropdownItem}
        >
          <i className="fa-solid fa-key"></i>
          Change password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
