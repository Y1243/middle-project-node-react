const Post = require("../models/Post")

const createNewPost = async (req, res) => {
    const { title, body } = req.body
    if (!title) {
        return res.status(400).send('title is required')
    }
    const post = await Post.create({ title, body })
    if (post)
        return getAllPost(req,res)
    return res.status(400).send('post not created')
}

const getAllPost = async (req, res) => {
    const posts = await Post.find().lean()
    if (!posts?.length)
        return res.status(400).send("dont found posts")
    res.json(posts)
}

const getPostById = async (req, res) => {
    const { id } = req.params
    const post = await Post.findById(id).lean()
    if (!post) {
        return res.status(400).send("This post no found")
    }
    res.json(post)
}
const updatePost = async (req, res) => {
    const { id, title, body } = req.body
    if (!id || !title) {
        return res.status(400).send("id and title is requried")
    }
    const post = await Post.findById(id).exec()
    if (!post) {
        return res.status(400).send("Dont have this post")
    }
    post.title = title
    post.body = body
    const updatedPost = await post.save()
    return getAllPost(req,res)
}

const deletePost = async (req, res) => {
    const { id } = req.params
    const post = await Post.findById(id).exec()
    if (!post) {
        return res.status(400).send("the post not found")
    }
    const result = await post.deleteOne()
    return res.json(await Post.find().lean())

}

module.exports = { createNewPost, getAllPost, getPostById, updatePost, deletePost }