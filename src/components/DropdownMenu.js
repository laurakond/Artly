import React from "react";
import { useHistory } from "react-router";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/DropDownMenu.module.css";

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

export const DropdownMenu = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown drop="bottom">
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

export const BuyerDropdownMenu = ({ handleDelete }) => {
  return (
    <Dropdown drop="bottom">
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

export function ProfileEditDropdown({ id }) {
  const history = useHistory();
  return (
    <Dropdown className={`ml-auto px-3`} drop="left">
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
