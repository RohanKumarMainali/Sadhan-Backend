const POST_CATEGORY = require('./subController/postCategory')
const GET_CATEGORY = require('./subController/getCategory')
const DELETE_CATEGORY = require('./subController/deleteCategory')
const UPDATE_CATEGORY = require('./subController/updateCategory')

module.exports = {postCategory: POST_CATEGORY, getCategory: GET_CATEGORY,updateCategory: UPDATE_CATEGORY, deleteCategory: DELETE_CATEGORY}
