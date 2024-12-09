import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const ThreeDots = React.forwardRef(({ onClick }, ref) => (
    <p
        // className="fas fa-elipsis-v"
        ref={ref}
        onClick={(e) => {
        e.preventDefault();
        onClick(e);
        }}
    >Three dots</p>
));

export const DropdownMenu = ({handleEdit, handleDelete}) => {
    return (
        <Dropdown>
            <Dropdown.Toggle as={ThreeDots}/>

            <Dropdown.Menu>
            <Dropdown.Item
                onClick={handleEdit}
                aria-label="edit"
            >
                Edit
            </Dropdown.Item>
            <Dropdown.Item
                onClick={handleDelete}
                aria-label="delete"
            >
                Delete
            </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
