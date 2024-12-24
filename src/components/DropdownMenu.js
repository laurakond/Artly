import React from "react";
import { useHistory } from "react-router";
import Dropdown from "react-bootstrap/Dropdown";

const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <p
    // className="fas fa-elipsis-v"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    Three dots
  </p>
));

export const DropdownMenu = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={ThreeDots} />

      <Dropdown.Menu popperConfig={{ strategy: "fixed" }}>
        <Dropdown.Item onClick={handleEdit} aria-label="edit">
          Edit
        </Dropdown.Item>
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
