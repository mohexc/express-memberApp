const express = require('express')
const members = require('../../Members')
const uuid = require('uuid')
const router = express.Router()

//? Get All members
router.get('/', (req, res) => res.json(members))

//? Get single members
router.get('/:id', (req, res) => {
  // res.send(req.params.id))
  const found = members.some(member => member.id === parseInt(req.params.id))
  if (found) return res.json(members.filter(member => member.id === parseInt(req.params.id)))
  else res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
})

//? Create memberr
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  }
  if (!newMember.name || !newMember.email)
    return res.status(400).json({ msg: `Please include a name and email` })

  members.push(newMember)
  res.json(members)
})

router.put('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id))
  if (found) {
    const updMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name
        member.email = updMember.email ? updMember.email : member.email

        res.json({ msg: "Member update", member })
      }
    })
  }


  else return res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
})

//? Delet member
router.delete('/:id', (req, res) => {
  console.log(typeof req.params.id)
  const found = members.some(member => member.id == parseInt(req.params.id))

  if (found) {
    let newMember = members.filter(member => member.id !== parseInt(req.params.id))

    return res.json({
      msg: "Member deleted",
      members: newMember
    })
  }
  else res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
})

module.exports = router