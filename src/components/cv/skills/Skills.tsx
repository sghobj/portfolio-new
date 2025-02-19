import './Skills.scss'

export type SkillType = {
    name: string;
    level: number;
};

type SkillsProps = {
    skills: SkillType[];
};

export const Skills = ({skills}: SkillsProps) => {
    return (
        <section className="skills-container">
            <div className="container overflow-hidden">
                <div className="row justify-content-xl-center gy-3 gy-sm-4">
                    {skills.map((skill, index) => {
                            return (
                                <div key={index} className="col-12 col-sm-6 col-xl-5">
                                    <h3 className="skill-name">{skill.name}</h3>
                                    <div className="progress" role="progressbar" aria-label="Skill level"
                                         aria-valuenow={skill.level}
                                         aria-valuemin={0} aria-valuemax={100} style={{height: "1px"}}>
                                        <div className="progress-bar" style={{width: `${skill.level}%`}}></div>
                                    </div>
                                </div>
                            )
                        }
                    )}
                </div>
            </div>
        </section>
    )
}