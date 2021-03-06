let mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Comment = require('./comment');
let User = require('./user');

let Post = Schema({
    category: { type: String, required: true },
    title: { type: String, required: true, },
    createdAt: { type: String, required: true },
    writer: { type: Schema.ObjectId, required: true },
    contents: { type: String, required: true },
    like: [{ type: Schema.Types.ObjectId, ref: 'User', required: true, default: [] }],
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
    like : 공감한 사람들. like.length = 공감수
    comment : 댓글
    enableComment : 댓글 작성 여부 true | false
    enableLike : 공감 여부 true | false
*/

Post.statics.create = function(category, title, writer, contents, enableComment, enableLike) {

    const date = new Date();
    const createdAt = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();


    let post = new this({ category, title, writer, contents, enableComment, enableLike, createdAt });


    return post.save();
};

Post.statics.view = function (i, callback) {
    this.find({}, (err, find) => {
        if (err) {
            callback(err);
        } else if (0 < find.length) {
            let objArray = new Array();
            for (let i = 0; i < find.length; i++) {
                delete find[i]._doc.enableLike;
                delete find[i]._doc.enableComment;
                objArray.push(find[i]);
            }
            callback(objArray);
        }
    }).sort({ like: 1 }).limit(6).skip(i * 12);
};

Post.methods.like = function (people) {
    this.like.unshift(people);

    return this.save();
}

Post.methods.unlike = function(people){
    this.like.splice(this.like.indexOf(people), 1);

    return this.save();
}

module.exports = mongoose.model('Post', Post);