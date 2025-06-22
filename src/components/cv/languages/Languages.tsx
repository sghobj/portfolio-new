import { Rating } from "../../rating/Rating.tsx";
import "./Languages.scss";

type LanguageType = {
  id: string;
  language: string;
  level: number;
};

type LanguagesProps = {
  languages: LanguageType[];
};
export const Languages = ({ languages }: LanguagesProps) => {
  return (
    <section className="langauges-container">
      <div className="container-fluid overflow-hidden">
        <div className="row gy-3 gy-md-4">
          {languages.map((lang) => {
            return (
              <div
                key={lang.id}
                className="language-col col-6 col-md-4 col-lg-3"
              >
                <h3 className="lang-name">{lang.language}</h3>
                <Rating level={lang.level} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
