import { useState } from 'react';
import './selectionList.scss';

interface SelectionListProps {
  listItems: string[];
}

export const SelectionList: React.FC<SelectionListProps> = ({ listItems }) => {
  const [activeLink, setActiveLink] = useState(0);

  const handleClick = (e) => {
    listItems.filter((i, index) => {
      if (i === e.target.outerText) {
        setActiveLink(index);
      }
    });
  };

  const renderedList = listItems.map((item, index) => {
    return (
      <li
        key={`${item}-${index}`}
        onClick={handleClick}
        className={`selectionList_item${
          activeLink === index ? '--active' : ''
        }`}
      >
        {item}
      </li>
    );
  });

  return <ul className="selectionList">{renderedList}</ul>;
};
