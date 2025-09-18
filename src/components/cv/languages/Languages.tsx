import { Rating } from "../../rating/Rating.tsx";
import "./Languages.scss";
import { ComponentCvLanguage } from "../../../generated/graphql.ts";

type LanguagesProps = {
  languages: ComponentCvLanguage[];
};
export const Languages = ({ languages }: LanguagesProps) => {
  return (
    <section className="langauges-container">
      <div className="container-fluid overflow-hidden">
        <div className="row">
          {languages.map((lang) => {
            return (
              <div
                key={lang.id}
                className="language-col col-12 col-md-6 col-lg-6"
              >
                <h3 className="lang-name">{lang.language}</h3>
                <Rating level={lang.level ?? 0} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
