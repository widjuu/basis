import { useState } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

import { Elves } from "./Elves";

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    zIndex: 1031,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  content: {
    padding: 30,
    maxWidth: 500,
    maxHeight: 500,
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const customDetailedStyles = {
  overlay: {
    zIndex: 1031,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  content: {
    padding: 30,
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "calc(100vw - 2rem)",
    maxHeight: "calc(100vh - 2rem)",
    overflowY: "auto",
    position: "relative",
  },
};

const initialState = {
  name: "",
  email: "",
  message: "",
  phone: "",
};

export const Services = (props) => {
  const [{ name, email, message, phone }, setState] = useState(initialState);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [detailedModalOpen, setDetailedModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => setState({ ...initialState });

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_jnr9t38",
        "template_3in6l4i",
        {
          from_name: name,
          message,
          phone,
          device: modalIsOpen.name,
        },
        "user_V88ibrVd4JqNmDkfaH3zb"
      )
      .then(
        (result) => {
          clearState();
          console.log(result.text);
          toast.success("Сообщение отправлено!", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          setIsOpen(false);
        },
        (error) => {
          clearState();
          console.log(error.text);
          toast.error("Произошла ошибка при отправке сообщения!", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          setIsOpen(false);
        }
      );
  };

  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Продукция</h2>
          <p></p>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div
                  key={`${d.name}-${i}`}
                  className="col-md-4 card2"
                  onClick={() => setDetailedModalOpen(d)}
                >
                  <img src={d.icon} alt={d.name} width={176} height={137} />
                  <div className="service-desc">
                    <h3>{d.name}</h3>
                    <p>{d.text.substring(0, 100)}...</p>
                    <h3>{d.price ? `${d.price} р.` : "-"}</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(d);
                      }}
                      className="btn btn-custom btn-lg center-block"
                    >
                      Заказать
                    </button>
                  </div>
                </div>
              ))
            : "Загрузка..."}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen !== false}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
      >
        <div className="form-group" style={{ margin: "-30 -20 30 -15" }}>
          <button
            style={{ float: "right", padding: "10 15", marginTop: -10 }}
            className="btn btn-custom btn-lg"
            onClick={() => setIsOpen(false)}
          >
            <i className="fa fa-times"></i>
          </button>
          <h3>{modalIsOpen.name}</h3>
        </div>
        <div className="row">
          <p>
            Пожалуйста, заполните форму ниже чтобы отправить нам электронное
            письмо. Мы свяжемся с вами при первой возможности.
          </p>
          <form name="sentMessage" validate="true" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Ваше имя"
                required
                onChange={handleChange}
                value={name}
              />
              <p className="help-block text-danger"></p>
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Ваш Email"
                required
                onChange={handleChange}
                value={email}
              />
              <p className="help-block text-danger"></p>
            </div>
            <div className="form-group">
              <input
                type="phone"
                id="phone"
                name="phone"
                className="form-control"
                placeholder="Ваш номер телефона"
                required
                onChange={handleChange}
                value={phone}
              />
              <p className="help-block text-danger"></p>
            </div>
            <div className="form-group">
              <textarea
                name="message"
                id="message"
                className="form-control"
                rows="4"
                placeholder="Введите сообщение"
                required
                onChange={handleChange}
                value={message}
              ></textarea>
              <p className="help-block text-danger"></p>
            </div>
            <div id="success"></div>
            <div className="center-button">
              <button
                type="submit"
                className="btn btn-custom btn-lg center-block"
              >
                Оформить заказ
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        isOpen={detailedModalOpen !== false}
        onRequestClose={() => setDetailedModalOpen(false)}
        style={customDetailedStyles}
      >
        <div className="form-group" style={{ margin: "-20 -20 30 -15" }}>
          <button
            style={{ float: "right", padding: "10 15" }}
            className="btn btn-custom btn-lg"
            onClick={() => setDetailedModalOpen(false)}
          >
            <i className="fa fa-times"></i>
          </button>
        </div>
        <div className="row">
          <div className="col-md-3">
            <img
              src={detailedModalOpen.icon}
              alt={detailedModalOpen.name}
              style={{ marginLeft: -40 }}
              width={352}
              height={274}
            />
          </div>
          <div className="col-md-6">
            <h3>{detailedModalOpen.name}</h3>
            <p>{detailedModalOpen.text}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: detailedModalOpen.description,
              }}
            />
          </div>
          <div className="col-md-3">
            <div className="center-button">
              <h3>
                {detailedModalOpen.price
                  ? `${detailedModalOpen.price} р.`
                  : "-"}
              </h3>
            </div>
            <div className="center-button">
              <button
                onClick={() => setIsOpen(detailedModalOpen)}
                className="btn btn-custom btn-lg center-block button"
              >
                Оформить заказ
              </button>
            </div>
            {detailedModalOpen.driver && (
              <div className="center-button" style={{ marginTop: 20 }}>
                <a
                  className="btn btn-custom btn-lg center-block button"
                  href={detailedModalOpen.driver}
                  download
                >
                  Скачать драйвер
                </a>
              </div>
            )}
            {detailedModalOpen.instruction && (
              <div className="center-button" style={{ marginTop: 20 }}>
                <a
                  className="btn btn-custom btn-lg center-block button"
                  href={detailedModalOpen.instruction}
                  target="_blank"
                  rel="noreferrer"
                >
                  Видеоинструкция
                </a>
              </div>
            )}

            {detailedModalOpen.template && <Elves input={detailedModalOpen} />}
          </div>
        </div>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
