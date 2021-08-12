import React, { useContext, useEffect, useState, useCallback } from "react"
import { useHttp } from "../hooks/http.hook"
import { AuthContext } from "../context/authContext"
import { Loader } from "../components/Loader"
import { LinksList } from "../components/LinksList"


export const LinksPage = () => {
  const [links, setLinks] = useState([])
  const { loading, request } = useHttp()
  const { token } = useContext(AuthContext)

  const getLinks = useCallback(async () => {
    try {
      const links = await request("/api/link", "GET", null, {
        authorization: `Bearer ${token}`,
      })

      setLinks(links)
    } catch (error) {}
  }, [token, request])

  useEffect(() => {
    getLinks()
  }, [getLinks])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && <LinksList links={links}/>}
    </>
  )
}
