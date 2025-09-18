import "./Skills.scss";
import { Rating } from "../../rating/Rating.tsx";
import { ComponentCvSkill } from "../../../generated/graphql.ts";

type SkillsProps = {
  skills: ComponentCvSkill[];
};

export const Skills = ({ skills }: SkillsProps) => {
  return (
    <section className="skills-container">
      <div className="container-fluid overflow-hidden">
        <div className="row gy-3 gy-md-4">
          {skills.map((skill, index) => {
            return (
              <div key={index} className="skill-col col-6">
                <h3 className="skill-name">{skill.name}</h3>
                <Rating level={skill.level ?? 0} />
                {/*<div className="progress" role="progressbar" aria-label="Skill level"*/}
                {/*     aria-valuenow={skill.level}*/}
                {/*     aria-valuemin={0} aria-valuemax={100} style={{height: "2px"}}>*/}
                {/*    <div className="progress-bar" style={{width: `${skill.level * 10}%`}}></div>*/}
                {/*</div>*/}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
