const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Place = mongoose.model("Place");

const requireToken = require("../middleware/token");

router.post("/place", requireToken, async (req, res) => {
  try {
    const { name, latitude, longitude, nearestMechanic } = req.body;
    const place = new Place({
      name,
      longitude,
      latitude,
      nearestMechanic,
    });
    await place.save();
    res.status(200).send({ msg: "location posted successfully" });
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.get("/place", requireToken, async (req, res) => {
  try {
    Place.find({}).then((places) => {
      res.status(200).send({ places });
    });
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.get("/place/:placeId", requireToken, async (req, res) => {
  try {
    Place.findOne({_id: req.params.placeId}).then((place) => {
      if(place){
        res.status(200).send({ place });
      }
      else {
        res.status(422).send({error: "place not found"})
      }
    });
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.post("/place/mechanic/:placeId", requireToken, async (req, res) => {
  try {
    const {placeId} = req.params;
    const {mechanic} = req.body;
    console.log('mechanic', mechanic)
    Place.findByIdAndUpdate(placeId, 
      {$push: {nearestMechanic: mechanic}}).then(result => {
        if(result){
          return res.status(200).send({msg: 'mechanic added successfully!'})
        }
        else return res.status(422).send({error: 'something went wrong'})
      })
  } catch (error) {
    res.status(500).send({error: error?.message})
  }
})

router.delete('/place/:placeId', requireToken, async(req, res) => {
  try {
      Place.findOne({_id: req.params.placeId}).then((place) => {
        if(!place){
          return res.status(422).send({error: "Already deleted place!"})
        }
        place.deleteOne().then(result => {
          res.status(200).send({msg: 'place deleted successfully'})
        }).catch(err => {
          res.status(500).send({error: err.message})
        })
      })
  }
  catch(err) {
    res.status(422).send({error:err.message})
  }
})

router.delete('/place/mechanic/:placeId/:mechanicId', requireToken, async(req, res) => {
  try {
    const {placeId, mechanicId} = req.params;
    Place.findByIdAndUpdate(placeId, 
      { $pull: { nearestMechanic: [mechanicId] } },
      { new: true }
      ).then(result => {console.log('rr', result)
    return res.status(200).send({data: result})
    })
  }
  catch(err) {
    res.status(422).send({error:err.message})
  }
})

module.exports = router;
