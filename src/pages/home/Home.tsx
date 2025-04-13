import './Home.scss'
import {useScreenSize} from "../../hooks/useScreenSize.ts";
import {Cv} from "../cv/Cv.tsx";
import {useQuery} from "@apollo/client";
import {CV_QUERY} from "../../queries/cv-query.ts";
import {useEffect, useState} from "react";
import {Spinner} from "../../components/spinner/Spinner.tsx";

export const Home = () => {

    const [landingImageUrl, setLandingImageUrl] = useState<string | undefined>(undefined);
    const [name, setName] = useState<string | undefined>(undefined);
    const [subtitle, setSubtitle] = useState<string | undefined>(undefined);
    const {loading, data} = useQuery(CV_QUERY);

    useEffect(() => {
        if (data && data.cv) {
            const {coverImageUrl, name, subtitle} = data.cv
            setLandingImageUrl(coverImageUrl)
            setName(name)
            setSubtitle(subtitle)
        }
    }, [data])

    const screenSize = useScreenSize();

    const isSmallScreen = screenSize.width < 840

    return (
        <>
            {!loading ?
                <>
                    <div className=".container landing-container">
                        <img className={'img-fluid'} src={landingImageUrl} alt={'landing-photo'}/>
                        <div className={'landing-text-div'}>
                            <h1 className={'landing-title'}>{name}</h1>
                            <h3 className={'landing-subtitle'}>{subtitle}</h3>
                        </div>
                    </div>
                    {isSmallScreen ? <Cv/> : null}
                </> :
                <Spinner/>
            }
        </>
    )
}

