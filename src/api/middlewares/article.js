import Article from '../models/article'

export const fetchArticles = (req, res) => {
    Article.find().exec((err, docs) => {
        console.log(docs)
        if (err) {
            res.status(400).json({
                message: err.message
            })
        }
        else {
            res.status(200).json({
                articles: docs
            })
        }
    })
}