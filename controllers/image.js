const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '4e4d65ba1ecd4d51ac2474168975b636'
});

const handleImageUrl = ( req, res ) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to access API'))
}

const handleImage = ( req, res, db ) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unableto get entries'))
}

module.exports = {
    handleImage,
    handleImageUrl
}