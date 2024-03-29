 //const Clarifai = require('clarifai');
 
const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key 04606e4cd2f643cdb7f48af60cb430b5")


 //const app = new Clarifai.App({
 //   apiKey: '04606e4cd2f643cdb7f48af60cb430b5'
 //  });
const handleApiCall = (req, res) => {
stub.PostModelOutputs(
    {
        // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
        model_id: "a403429f2ddf4b49b307e318f00e528b",
        inputs: [{data: {image: {url: req.body.input}}}]
    },
    metadata,
    (err, response) => {
        if (err) {
            console.log("Error: " + err);
            return;
        }

        if (response.status.code !== 10000) {
            console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
            return;
        }

        console.log("Predicted concepts, with confidence values:")
        for (const c of response.outputs[0].data.concepts) {
            console.log(c.name + ": " + c.value);
        }
        res.json(response);
    }
);

   //const handleApiCall = (req, res) => {
//    app.models
//    .predict('face-detection', req.body.input)
// then(data => {
//  res.json(data);
//  })
// .catch(err => res.status(400).json('unable to work wit api'));
}
   
 const handleImagePut = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
    handleImagePut,
    handleApiCall};