import { useState } from "react";
import XLSX from "xlsx";

//utils
import { download } from "../utils/download";
import { getTxt } from "../utils/getTxt";

export const Elves = ({ input }) => {
  const [buttonType, setButtonType] = useState("upload");
  const [data, setData] = useState([]);

  const reader = new FileReader();
  const rABS = !!reader.readAsBinaryString;

  const accept = [
    "text/csv",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  reader.onload = (e) => {
    const bstr = e.target.result;
    const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    const data = XLSX.utils.sheet_to_json(ws, {
      header: 1,
    });
    setData(getTxt(data));
    setButtonType("download");
  };

  const handleRead = (file) => {
    reader.readAsBinaryString(file);
  };

  const downloadClick = (data) => {
    download(data);
    setButtonType("upload");
  };

  const onFileUpload = async (e) => {
    const [file] = e.target.files;

    const isCsvOrXlsx =
      file.type === "text/csv" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    if (!isCsvOrXlsx) {
      alert("Не правильный формат файла");
    }

    handleRead(file);
  };

  return (
    <>
      <div className="center-button" style={{ marginTop: 20 }}>
        <a
          className="btn btn-custom btn-lg center-block button"
          href={input.template}
          download
        >
          Скачать шаблон
        </a>
      </div>

      <div className="center-button" style={{ marginTop: 20 }}>
        {buttonType === "upload" ? (
          <label htmlFor="upload">
            <span className="btn btn-custom btn-lg center-block button">
              <img
                src={process.env.PUBLIC_URL + "/img/upload.svg"}
                alt=""
                className="img"
              />
              Загрузить
            </span>
            <input
              id="upload"
              accept={accept.length > 0 ? accept.join(",") : undefined}
              multiple={false}
              type="file"
              onChange={onFileUpload}
              style={{ display: "none" }}
            />
          </label>
        ) : (
          <span
            className="btn btn-custom btn-lg center-block button"
            onClick={() => downloadClick(data)}
          >
            Скачать
          </span>
        )}
      </div>
    </>
  );
};
