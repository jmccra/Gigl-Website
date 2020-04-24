const { Gig, UserClient } = require("../database");

async function getActiveGigs(req, res) {
  const user = req.session.userClient;
  const clientGig = await Gig.find({ owner: user._id });
  res.json({ gigs: clientGig });
}

async function postGig(req, res) {
  const user = req.session.userClient;
  const newClientGig = new Gig({
    name: req.body.name,
    location: req.body.location,
    date: req.body.date,
    price: req.body.price,
    description: req.body.description,
    applicants: [],
    owner: user._id,
  });
  await newClientGig.save();
  res.json({ success: true });
}

async function getUsername(req, res) {
  const user = req.session.userClient;
  const clientUsername = await UserClient.find({ username: user.username });
  res.json({ username: clientUsername });
}

module.exports = { getActiveGigs, postGig, getUsername };
