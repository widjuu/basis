export const Features = (props) => {
  const ftpUrl = "ftp://u0958616_anonimu:fQ6rZ4oM9ufA6h@ntcbazis.su";

  return (
    <div id="features" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2 style={{ paddingTop: 50 }}>О нас</h2>
        </div>

        <div className="row">
          {props.data
            ? props.data.map((d, i) => {
                //в сблоке сервис возвращаем верстку со ссылкой на ftp
                //проверяем блок по тайтлу

                if (d.title === "Сервис") {
                  return (
                    <div key={`${d.title}-${i}`} className="col-md-4">
                      <a href={ftpUrl}>
                        <i className={d.icon}></i>
                      </a>

                      <a href={ftpUrl}>
                        <h3>{d.title}</h3>
                      </a>

                      <p>{d.text}</p>
                    </div>
                  );
                }

                return (
                  <div key={`${d.title}-${i}`} className="col-md-4">
                    <i className={d.icon}></i>

                    <h3>{d.title}</h3>

                    <p>{d.text}</p>
                  </div>
                );
              })
            : "Загрузка..."}
        </div>
      </div>
    </div>
  );
};
