import React from "react";

interface CheckIconProps {
  className?: string;
}

const SearchIcon: React.FC<CheckIconProps> = ({ className }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="7" stroke="white" strokeWidth="2" />
      <rect
        x="14.4645"
        y="15.1716"
        width="1"
        height="9"
        rx="0.5"
        transform="rotate(-45 14.4645 15.1716)"
        stroke="white"
      />
    </svg>
  );
};

export default SearchIcon;
