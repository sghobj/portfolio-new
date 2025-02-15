import {About} from "../../components/cv/about/About.tsx";
import {Skills} from "../../components/cv/skills/Skills.tsx";
import './Cv.scss'
export const Cv = () => {
    return(
        <>
            <div>
                <h1 className={'section-header'}>About</h1>
                <About/>
            </div>
            <div>
                <h1 className={'section-header'}>Skills</h1>
                <Skills/>
            </div>

        </>
    )
}