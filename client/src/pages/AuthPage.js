import React, { useContext, useEffect, useState } from "react"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"
import {AuthContext} from '../context/authContext'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const { loading, error, request, clearError } = useHttp()
  const message = useMessage()
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form })
      message(data.message)
    } catch (error) {}
  }
  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form })
      auth.login(data.token, data.userId)
    } catch (error) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи </h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div className="row">
              <div className="input-field col s6">
                <input
                  placeholder="введите email"
                  id="email"
                  type="text"
                  name="email"
                  onChange={changeHandler}
                />
                <label htmlFor="email">email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input
                  placeholder="введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  onChange={changeHandler}
                />
                <label htmlFor="password">password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              disabled={loading}
              onClick={loginHandler}
            >
              Войти
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
