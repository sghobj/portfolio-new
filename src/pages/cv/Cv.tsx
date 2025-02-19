import {About} from "../../components/cv/about/About.tsx";
import {Skills} from "../../components/cv/skills/Skills.tsx";
import './Cv.scss'
import {useEffect, useState} from "react";
import axiosInstance from "../../utils/axiosInstance.ts";


export const Cv = () => {
    const [skills, setSkills] = useState([])
    const [about, setAbout] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/api/cv?populate=*');
                const {about, skills} = response.data.data
                setAbout(about)
                setSkills(skills)

                console.log(skills)
            } catch (err) {
                console.log('Error fetching data');
            }
        };
        fetchData();
    }, []);


    return(
        <>
            <div className={"cv-section"}>
                <h1 className={'section-header'}>About</h1>
                <About text = {about} />
            </div>
            <div className={"cv-section"}>
                <h1 className={'section-header'}>Skills</h1>
                <Skills skills={skills} />
            </div>

        </>
    )
}