import './heading-module.scss';

interface HeadingProps {
  headingType: string;
  content: string;
  color: string;
}

function getHeading(headingType: string, content: string, color: string) {
  switch (headingType) {
    case 'h1':
      console.log(headingType);
      return (
        <h1
          className={`${
            color === 'dark' ? 'heading_text--dark' : 'heading_text--light'
          }`}
        >
          {content}
        </h1>
      );
    case 'h2':
      return (
        <h2
          className={` ${
            color === 'dark' ? 'heading_text--dark' : 'heading_text--light'
          }`}
        >
          {content}
        </h2>
      );
    case 'h3':
      return (
        <h3
          className={`${
            color === 'dark' ? 'heading_text--dark' : 'heading_text--light'
          }`}
        >
          {content}
        </h3>
      );
    case 'h4':
      return (
        <h4
          className={`${
            color === 'dark' ? 'heading_text--dark' : 'heading_text--light'
          }`}
        >
          {content}
        </h4>
      );
    case 'h5':
      return (
        <h5
          className={`${
            color === 'dark' ? 'heading_text--dark' : 'heading_text--light'
          }`}
        >
          {content}
        </h5>
      );
    case 'h6':
      return (
        <h6
          className={`${
            color === 'dark' ? 'heading_text--dark' : 'heading_text--light'
          }`}
        >
          {content}
        </h6>
      );
    default:
      return (
        <p
          className={`${
            color === 'dark' ? 'heading_text--dark' : 'heading_text--light'
          }`}
        >
          {content}
        </p>
      );
  }
}

export const HeadingText: React.FC<HeadingProps> = ({
  headingType,
  content,
  color,
}) => {
  const rendered = getHeading(headingType, content, color);

  return <div className="heading_typography">{rendered}</div>;
};
