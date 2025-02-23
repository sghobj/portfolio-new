import './Home.scss'
import {useScreenSize} from "../../hooks/useScreenSize.ts";
import {Cv} from "../cv/Cv.tsx";
import {useQuery} from "@apollo/client";
import {CV_QUERY} from "../../queries/cv-query.ts";
import {useEffect, useState} from "react";

export const Home = () => {

    const [landingImageUrl, setLandingImageUrl] = useState<string | undefined>(undefined);
    const { data } = useQuery(CV_QUERY);

    useEffect(() => {
        if(data && data.cv) {
            const {coverImageUrl} = data.cv
            setLandingImageUrl(coverImageUrl)
            setLandingImageUrl(coverImageUrl)
        }
    }, [data])

    const screenSize = useScreenSize();

    const isSmallScreen = screenSize.width < 840

    return (
        <>
            <div className=".container landing-container">
                <img className={'img-fluid'} src={landingImageUrl} alt={'landing-photo'}/>
                <div className={'landing-text-div'}>
                    <h1 className={'landing-title'}>Sarah Ghobj</h1>
                    <h3 className={'landing-subtitle'}>Software Engineer</h3>
                </div>
            </div>
            {isSmallScreen ? <Cv/> : null}
        </>
    )
}

