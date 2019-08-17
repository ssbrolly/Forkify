export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLIke(id, title, author, img) {
        const like = {id, title, author, img};
        this.likes.push(like);
        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);
    }

    isLIked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }
}