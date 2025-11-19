import "./About.scss";

type AboutType = {
  text: string;
};
export const About = ({ text }: AboutType) => {
  return (
    <div>
      <p className={"about-me-text"}>{text}</p>
    </div>
  );
};
