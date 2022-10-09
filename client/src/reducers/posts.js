  // posts in parameter is state
const posts = (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...posts, action.payload];
        default:
            break;
    }
    return posts;
}

export default posts;