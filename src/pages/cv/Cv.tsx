import {useEffect, useState} from "react";
import { useQuery } from "@apollo/client";
import {About} from "../../components/cv/about/About.tsx";
import {Skills} from "../../components/cv/skills/Skills.tsx";
import './Cv.scss'
import { CV_QUERY } from "../../queries/cv-query.ts";


export const Cv = () => {
    const [skills, setSkills] = useState([])
    const [education, setEducation] = useState([])
    const [experiences, setExperiences] = useState([])
    const [about, setAbout] = useState('')

    const { data, error } = useQuery(CV_QUERY);

    useEffect(() => {
        if(data && data.cv) {
            const { skills, education, about, experiences} = data.cv

            setSkills(skills)
            setEducation(education)
            setExperiences(experiences)
            setAbout(about)

        } else if(error) {
            console.log(error)
        }
    }, [data, error])

    useEffect(() => {
        console.log(education)
        console.log(experiences)
    }, [experiences, education])
    return (
        <div className={'cv-page-container'}>
            <div className="container-fluid">
                <div className="row">
                    <div className={"col-lg cv-section"}>
                        <h1 className={'section-header'}>About</h1>
                        {about ? <About text={about}/> : null}
                    </div>
                    <div className={"col-lg cv-section"}>
                        <h1 className={'section-header'}>Skills</h1>
                        {skills ? <Skills skills={skills}/> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}