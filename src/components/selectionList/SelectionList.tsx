import { useState } from 'react';
import './selectionList.scss';

interface SelectionListProps {
  listItems: string[];
}

export const SelectionList: React.FC<SelectionListProps> = ({ listItems }) => {
  const [activeLink, setActiveLink] = useState(0);

  const handleClick = (e: React.MouseEvent) => {
    const category = (e.target as HTMLElement).outerText;

    listItems.filter((i, index) => {
      if (i === category) {
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
