import './Experience.scss'
import {formatDate} from "../../../utils/general.ts";

export type ExperienceType = {
    from: string;
    to?: string;
    company: string;
    location: string;
    position: string;
    description?: string;
};

type ExperienceProps = {
    experiences: ExperienceType[];
};

export const Experience = ({experiences}: ExperienceProps) => {
    return (
        <section>
                        <div className="table-div">
                                {experiences.map((item, index) => {
                                    return (
                                        <div className={"row border-bottom py-3"} key={index}>
                                            <div className={'date-col col-12 col-md-3'}>{formatDate(item.from)} - {item.to ? formatDate(item.to) : "now"}</div>
                                            <div className={'position-col col-12 col-md-6'}>
                                                <h5 className={'company'}>{item.company}</h5>
                                                <h6 className={'position'}>{item.position}</h6>
                                                <p className={'description'}>{item.description ? item.description : ""}</p>
                                            </div>
                                            <div className={'location-col col-xs-12 col-md-3 '}>
                                                {item.location}</div>
                                        </div>
                                    )
                                })}
                        </div>
        </section>
    )
}