import { formatDate } from "../../../utils/general.ts";
import { ComponentCvCertificates } from "../../../generated/graphql.ts";

type CertificatesProps = {
  certificates: ComponentCvCertificates[];
};

export const Certificates = ({ certificates }: CertificatesProps) => {
  return (
    <section>
      <div className="table-div">
        {certificates.map((cert) => {
          return (
            <div className={"row border-bottom py-3"} key={cert.id}>
              <div className={"date-col col-12 col-md-3"}>
                {formatDate(cert.date)}
              </div>
              <div className={"description-col col-12 col-md-6"}>
                {cert.name}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
