
const OAuth = require('oauth');
const oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  process.env.consumerKey,
  process.env.consumerSecret,
  '1.0A',
  null,
  'HMAC-SHA1'
);
module.exports ={
  timeline : (req,res)=>{
    oauth.get(
      'https://api.twitter.com/1.1/statuses/home_timeline.json',
      process.env.tokenKey, //test user token 
      process.env.tokenSecret, //test user secret             
      function (e, data, re){
        if(!e){
          let hasil = JSON.parse(data)
          res.status(200).send({
            message:"success",
            timeline:hasil
          })
        }else{
          res.status(400).send({
            message:'error happens',
            error:e
          })
        }
            
      });
  },
  createTweet : (req,res)=>{
    console.log(req.body.tweet,"========")
    oauth.post(
      'https://api.twitter.com/1.1/statuses/update.json?status='+req.body.tweet,
      process.env.tokenKey,
      process.env.tokenSecret,
      req.body.tweet,
      'tweet',
      (e,data) => {
       if(e) {
        console.log('masukerr' ,e)
         res.send(e)
       } else {
        res.send(data)
       }
      }
    )
  },
  searchTweet: (req,res)=>{
    oauth.get(
      'https://api.twitter.com/1.1/search/tweets.json?q='+req.query.name,
      process.env.tokenKey,
      process.env.tokenSecret,
      function(e,data,re){
        let parse = JSON.parse(data)
        if(e){
          res.status(400).send(e)
        }else{
          res.status(200).json({
            message:"success",
            result:parse
          })
        }
      }
    )
  }

      
}