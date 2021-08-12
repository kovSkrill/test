import React, { useState, useEffect, useContext } from "react"
import { useHttp } from "../hooks/http.hook"
import { AuthContext } from "../context/authContext"
import {useHistory} from "react-router-dom"

export const CreatePage = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const [link, setLink] = useState("")
  const { request } = useHttp()
  const pressHandler = async (event) => {
    if (event.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          { from: link },
          { authorization: `Bearer ${auth.token}` },
        )
        history.push(`/detail/${data.link._id}`)
      } catch (error) {}
    }
  }
  useEffect(() => {
    window.M.updateTextFields()
  })
  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field col s6">
          <input
            autoComplete="off"
            placeholder="Вставте ссылку"
            id="link"
            type="text"
            onChange={(event) => setLink(event.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Вставте ссылку</label>
        </div>
      </div>
    </div>
  )
}
