import React from "react";

interface EditButtonProps {
    onClick: () => void;
    ariaLabel?: string;
}

const EditIconButton: React.FC<EditButtonProps> = ({
    onClick,
    ariaLabel = "Edit",
}) => {
    return (
        <button
            onClick={onClick}
            aria-label={ariaLabel}
            style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* SVG für das Edit-Icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
            </svg>
        </button>
    );
};

export default EditIconButton;
