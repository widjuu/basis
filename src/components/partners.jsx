import ModalImage from "react-modal-image";

export const Partners = (props) => {
  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Аккредитованные ЦСО</h2>
          <p></p>
        </div>
        <div className="row">
          <div className="portfolio-items">
            {props.data
              ? props.data.map((d, i) => (
                  <div
                    key={`${d.title}-${i}`}
                    className="col-sm-3 col-md-3 col-lg-3"
                  >
                    <div className="portfolio-item hover-bg">
                      <ModalImage small={d.link} large={d.link} alt={d.title} />
                      <p>{d.title}</p>
                      <div>{d.text}</div>
                    </div>
                  </div>
                ))
              : "Загрузка..."}
          </div>
        </div>
      </div>
    </div>
  );
};
