import { formatDate } from "../../../utils/general.ts";

type PublicationType = {
  id: string;
  description: string;
  date: string;
};

type CertificatesProps = {
  publications: PublicationType[];
};

export const Publications = ({ publications }: CertificatesProps) => {
  return (
    <section>
      <div className="table-div">
        {publications.map((pub) => {
          return (
            <div className={"row border-bottom py-3"} key={pub.id}>
              <div className={"date-col col-12 col-md-3"}>
                {formatDate(pub.date)}
              </div>
              <div className={"description-col col-12 col-md-6"}>
                {pub.description}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
