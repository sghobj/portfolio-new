import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { About } from "../../components/cv/about/About.tsx";
import { Skills } from "../../components/cv/skills/Skills.tsx";
import "./Cv.scss";
import { CV_QUERY } from "../../queries/cv-query.ts";
import { Education } from "../../components/cv/education/Education.tsx";
import { Experience } from "../../components/cv/experience/Experience.tsx";
import { Certificates } from "../../components/cv/certificates/Certificates.tsx";
import { Languages } from "../../components/cv/languages/Languages.tsx";
import { Publications } from "../../components/cv/publications/Publications.tsx";
import { useScreenSize } from "../../hooks/useScreenSize.ts";
import {
  ComponentCvCertificates,
  ComponentCvEducation,
  ComponentCvExperience,
  ComponentCvLanguage,
  ComponentCvPublication,
  ComponentCvSkill,
} from "../../generated/graphql.ts";
import { useSpinner } from "../../hooks/useSpinner.ts";

type CV_Type = {
  skills?: ComponentCvSkill[];
  experiences?: ComponentCvExperience[];
  education?: ComponentCvEducation[];
  languages?: ComponentCvLanguage[];
  publications?: ComponentCvPublication[];
  certifications?: ComponentCvCertificates[];
  about?: string;
};

export const Cv = () => {
  const [cv, setCv] = useState<CV_Type>();

  const { setLoading } = useSpinner();

  const { loading, data, error } = useQuery(CV_QUERY);

  const screenSize = useScreenSize();

  const isSmallScreen = screenSize.width < 840;

  useEffect(() => {
    if (data && loading) {
      setLoading(false);
    }
  }, [data, loading, setLoading]);

  useEffect(() => {
    if (data?.cv) {
      setCv(data.cv);
      setLoading(false);
    } else if (error) {
      console.log(error);
    }
  }, [data, error, setLoading]);

  if (!data) return null;

  return (
    <div className={"cv-page-container"}>
      <div className="container-fluid">
        <div className="row gap-3">
          <div className={"col-sm-12 col-md-3 cv-section"}>
            {!isSmallScreen ? (
              <img
                className={"img-fluid cv-photo"}
                alt={"profile"}
                src={
                  "https://res.cloudinary.com/dsyxohckg/image/upload/v1756848314/WhatsApp_Image_2025-08-25_at_22.54.04_2a182829_rdwhe2.jpg"
                }
              />
            ) : null}
          </div>
          <div
            className={"col-sm-12 col-md-8 cv-section"}
            style={{ padding: 0 }}
          >
            <h1 className={"section-header"}>About</h1>
            {cv?.about ? <About text={cv.about} /> : null}
          </div>
        </div>
        <div className="row gap-3">
          <div className={"col-md-12 cv-section experiences"}>
            <h1 className={"section-header"}>Experience</h1>
            {cv?.experiences ? (
              <Experience experiences={cv.experiences} />
            ) : null}
          </div>
        </div>
        <div className="row gap-3">
          <div className={"col-lg cv-section education"}>
            <h1 className={"section-header"}>Education</h1>
            {cv?.education ? <Education education={cv.education} /> : null}
          </div>
        </div>
        <div className="row gap-3">
          <div className={"col-lg cv-section certificates"}>
            <h1 className={"section-header"}>Certificates</h1>
            {cv?.certifications ? (
              <Certificates certificates={cv.certifications} />
            ) : null}
          </div>
        </div>
        <div className="row gap-3">
          <div className={"col-lg cv-section publications"}>
            <h1 className={"section-header"}>Publications</h1>
            {cv?.publications ? (
              <Publications publications={cv.publications} />
            ) : null}
          </div>
        </div>
        <div className="row gap-0">
          <div className={"col-sm-12 col-md-6 cv-section"}>
            <h1 className={"section-header"}>Skills</h1>
            {cv?.skills ? <Skills skills={cv.skills} /> : null}
          </div>
          <div className={"col-sm-12 col-md-6 cv-section languages"}>
            <h1 className={"section-header"}>Languages</h1>
            {cv?.languages ? <Languages languages={cv.languages} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};
