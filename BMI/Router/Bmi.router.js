const express = require('express');
require('dotenv').config();
const authmiddleware = require('../middleware/Authmiddleware');
const BmiModel = require('../Model/Bmi.model');
const BmiRouter = express.Router();
///////////////////////getCalculation/////////////
BmiRouter.get('/getCalculation', authmiddleware, async (req, res) => {
  let userId = req.body.userId;
  let result = await BmiModel.find({ userId }).sort({ ind: -1 });
  if (result) {
    return res.send({ message: 'last calculated data', bmi: result[0] });
  } else {
    return res.send({ message: 'there is no data related to you' });
  }
});
//////////////////////calculateBMI////////////////////////
BmiRouter.post('/calculateBMI', authmiddleware, async (req, res) => {
  const { height, weight } = req.body;
  const bmi = weight / (height * 0.3048) ** 2;
  req.body.bmi = bmi;
  req.body.ind = new Date().getTime();
  try {
    await new BmiModel(req.body).save((err, success) => {
      if (err) {
        return res.send({ message: 'errorn in sending bmi data' });
      }
      return res.send({
        message: 'bmi data saved successflly',
        bmi: success.bmi,
      });
    });
  } catch (err) {}
});
module.exports = BmiRouter;
