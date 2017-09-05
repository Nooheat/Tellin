let mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Comment = require('./comment');
let User = require('./user');

let Post = Schema({
    category: { type: String, required: true },
    title: { type: String, required: true, },
    createdAt: { type: String, required: true },
    writer: { type: Schema.types.ObjectId, required: true },
    content: { type: String, required: true },
    like: { type: Number, required: true, default: 0 },
    unlike: { type: Number, required: true, default: 0 },
    comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    enableComment: { type: Boolean, required: true },
    enableLike: { type: Boolean, required: true }
}, { collection: 'Post' });


/* 
    category : 카테고리
    title : 제목
    createdAt : 작성일
    writer : 작성자 _id
    contents : 게시글 내용
    like : 공감수
    unlike : 비공감수
    comment : 댓글
    enableComment : 댓글 작성 여부 true | false
    enableLike : 공감 여부 true | false
*/

Post.statics.create = function(category, title, writer, content, enableComment, enableLike) {

    const date = new Date();
    const createdAt = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();


    let post = new this({ category, title, writer, content, enableComment, enableLike, createdAt });

    if (enableLike) post.like = 0;

    return post.save();
}

module.exports = mongoose.model('Post', Post);