import React, { useState, useCallback, useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHttp } from "../hooks/http.hook"
import { AuthContext } from "../context/authContext"
import { Loader } from "../components/Loader"
import { LinkCard } from "../components/LinkCard"

export const DetailPage = () => {
  const [link, setLink] = useState(null)
  const linkId = useParams().id
  const { request, loading } = useHttp()
  const { token } = useContext(AuthContext)

  const getLink = useCallback(async () => {
    try {
      const result = await request(`/api/link/${linkId}`, "GET", null, {
        authorization: `Bearer ${token}`,
      })
      setLink(result)
    } catch (error) {}
  }, [token, linkId, request])

  useEffect(() => {
    getLink()
  }, [getLink])

  if (loading) {
    return <Loader />
  }

  return <>{!loading && link && <LinkCard link={link} />}</>
}
