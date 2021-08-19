import { useState } from 'react'
import emailjs from 'emailjs-com'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Map } from './map'

const initialState = {
  name: '',
  email: '',
  message: ''
}

export const Contact = (props) => {
  const [{ name, email, message }, setState] = useState(initialState)

  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const clearState = () => setState({ ...initialState })

  const handleSubmit = (e) => {
    e.preventDefault()

    emailjs
      .send(
        'service_jnr9t38',
        'template_3in6l4i',
        {
          from_name: name,
          message
        },
        'user_V88ibrVd4JqNmDkfaH3zb'
      )
      .then(
        (result) => {
          clearState()
          console.log(result.text)
          toast.success('Сообщение отправлено!', {
            position: toast.POSITION.BOTTOM_LEFT
          })
        },
        (error) => {
          clearState()
          console.log(error.text)
          toast.error('Произошла ошибка при отправке сообщения!', {
            position: toast.POSITION.BOTTOM_LEFT
          })
        }
      )
  }

  return (
    <>
      <div id='contact'>
        <div className='container'>
          <div className='section-title text-center'>
            <h2>Контакты</h2>
          </div>
          <div className='col-md-5'>
            <div className='row'>
              <p>
                Пожалуйста, заполните форму ниже чтобы отправить нам электронное
                письмо. Мы свяжемся с вами при первой возможности.
              </p>
              <form name='sentMessage' validate='true' onSubmit={handleSubmit}>
                <div className='row'>
                  <div className='col-md-6 form-group'>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      className='form-control'
                      placeholder='Ваше имя'
                      required
                      onChange={handleChange}
                      value={name}
                    />
                    <p className='help-block text-danger'></p>
                  </div>
                  <div className='col-md-6 form-group'>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      className='form-control'
                      placeholder='Ваш Email'
                      required
                      onChange={handleChange}
                      value={email}
                    />
                    <p className='help-block text-danger'></p>
                  </div>
                </div>
                <div className='form-group'>
                  <textarea
                    name='message'
                    id='message'
                    className='form-control'
                    rows='4'
                    placeholder='Введите сообщение'
                    required
                    onChange={handleChange}
                    value={message}
                  ></textarea>
                  <p className='help-block text-danger'></p>
                </div>
                <div id='success'></div>
                <button
                  type='submit'
                  className='btn btn-custom btn-lg center-block'
                >
                  Отправить сообщение
                </button>
              </form>
            </div>
          </div>
          <div className='col-md-3 contact-info'>
            <div className='contact-item'>
              <h3>Контактные данные</h3>
              <>
                <span>
                  <i className='fa fa-map-marker'></i> Адреса
                </span>
                {props.data
                  ? props.data.addresses.map((address, index) => (
                      <div key={index.toString()}>
                        <a
                          href={`https://yandex.ru/maps/?text=${address}`}
                          target='_blank'
                          rel='noreferrer'
                        >
                          {address}
                        </a>
                      </div>
                    ))
                  : 'Загрузка...'}
              </>
            </div>
            <div className='contact-item'>
              <p>
                <span>
                  <i className='fa fa-phone'></i> Телефон
                </span>
                {props.data ? (
                  <a href={`tel:${props.data.phone}`}>{props.data.phone}</a>
                ) : (
                  'Загрузка...'
                )}
              </p>
            </div>
            <div className='contact-item'>
              <p>
                <span>
                  <i className='fa fa-envelope-o'></i> Email
                </span>
                {props.data ? (
                  <a href={`mailto:${props.data.email}`}>{props.data.email}</a>
                ) : (
                  'Загрузка...'
                )}
              </p>
            </div>
          </div>
          <div className='col-md-3 contact-info'>
            <Map />
          </div>
          <div className='col-md-12'>
            <div className='row'>
              <div className='social'>
                <ul>
                  <li>
                    <a
                      href={props.data ? props.data.facebook : '/'}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <i className='fa fa-facebook'></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href={props.data ? props.data.twitter : '/'}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <i className='fa fa-twitter'></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href={props.data ? props.data.youtube : '/'}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <i className='fa fa-youtube'></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='col-md-12'>
            <div className='row'>
              <div className='social'>
                <ul>
                  <li>
                    <p>&copy; {new Date().getFullYear()} Все права защищены</p>
                  </li>
                  <li>
                    <a
                      href='https://google.com/'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Политика конфиденциальности
                    </a>
                  </li>
                  <li>
                    <a
                      href='https://google.com/'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Специальная оценка условий труда
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}
