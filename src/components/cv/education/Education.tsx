import './Education.scss'

export type EducationType = {
    from: string;
    to?: string;
    institute: string;
    location: string;
    specialty: string;
    description?: string;
};

type EducationProps = {
    education: EducationType[];
};

export const Education = ({education}: EducationProps) => {
    return(
        <section>
            <div className="table-div">
                    {education.map((item, index) => {
                        return (
                    <div className={"row border-bottom py-3"} key={index}>
                        <div className={'date-col col-12 col-md-3'}>{item.from} - {item.to ? item.to : "now"}</div>
                        <div className={'specialty-col col-12 col-md-6'}>
                            <h5 className={'institute'}>{item.institute}</h5>
                            <h6 className={'specialty'}>{item.specialty}</h6>
                            <p className={'description'}>{item.description ? item.description : ""}</p>
                        </div>
                        <div className={'location-col col-12 col-md-3'}>
                        {item.location}</div>
                    </div>
                        )
                    })}
            </div>
        </section>
    )
}