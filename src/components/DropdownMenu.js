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
      <Dropdown.Toggle as={ThreeDots} className={styles.Toggle} />

      <Dropdown.Menu
        popperConfig={{ strategy: "fixed" }}
        className={styles.CustomDropdownMenu}
      >
        <Dropdown.Item
          onClick={handleEdit}
          aria-label="edit"
          className={styles.DropdownItem}
        >
          <i className="fa-solid fa-pen-to-square"></i>Edit
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
    <Dropdown>
      <Dropdown.Toggle as={ThreeDots} />

      <Dropdown.Menu popperConfig={{ strategy: "fixed" }}>
        <Dropdown.Item onClick={handleDelete} aria-label="delete">
          Delete
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
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit`)}
          aria-label="edit-profile"
        >
          <i className="fas fa-edit" /> edit profile
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
        >
          <i className="far fa-id-card" />
          change username
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
          aria-label="edit-password"
        >
          <i className="fas fa-key" />
          change password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
