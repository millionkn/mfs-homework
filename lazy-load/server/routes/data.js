var express = require('express');
var router = express.Router();
var data = require('../public/javascripts/data');

/* GET users listing. */
router.get('/:city1/:city2/', function(req, res, next) {
  var city1 = data.find(x=>x.region.code==req.params.city1).region;
  var city2 = city1.state.find(x=>x.code==req.params.city2)
  res.send(city2.city.map((x)=>{return Object.assign(x,{isLast:true})}));
});
router.get('/:city1/', function(req, res, next) {
  var city = data.find(x=>x.region.code==req.params.city1);
  res.send(city.region.state.map(x=>{return {
    name:x.name,
    code:x.code,
    isLast:x.city===undefined
  }}));
});
router.get('/', function(req, res, next) {
  res.send(data.map((x)=>{
    return {
      name:x.region.name,
      code:x.region.code,
      isLast:x.region.state===undefined
    }
  }));
});
router.get(/./,function(req,res,next){
  res.send([]);
})

module.exports = router;
