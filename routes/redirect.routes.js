/* eslint-disable prettier/prettier */
const { Router } = require("express")
const router = Router()
const Link = require("../models/Link")

router.get("/:code", async (req, res) => {
  try {
    const { code } = req.params
    const link = await Link.findOne({ code })

    if (link) {
      link.clicks++
      await link.save()
      return res.redirect(link.from)
    }

    res.status(404).json({ message: "Ссылка не найдена" })
  } catch (error) {
    res.status(500).json({ message: error.message || "Что-то пошло не так" })
  }
})

module.exports = router
