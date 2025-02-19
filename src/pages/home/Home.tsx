import './Home.scss'
import {useScreenSize} from "../../hooks/useScreenSize.ts";
import {Cv} from "../cv/Cv.tsx";

export const Home = () => {

    const screenSize = useScreenSize();

    const isSmallScreen = screenSize.width < 840

    const landingImgUrl = 'https://res.cloudinary.com/dsyxohckg/image/upload/v1656873333/Me/masters.jpg'
    // const landingImgUrl = 'https://res.cloudinary.com/dsyxohckg/image/upload/f_auto,q_auto/v1/Website/landing/laptop-hand'
    return (
        <>
            <div className=".container landing-container">
                <img className={'img-fluid'} src={landingImgUrl} alt={'landing-photo'}/>
                <div className={'landing-text-div'}>
                    <h1 className={'landing-title'}>Sarah Ghobj</h1>
                    <h3 className={'landing-subtitle'}>Software Engineer</h3>
                </div>
            </div>
            {isSmallScreen ? <Cv/> : null}
        </>
    )
}

