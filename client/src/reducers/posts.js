  // posts in parameter is state
const posts = (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...posts, action.payload];
        case 'UPDATE' : 
            // loop over original array and check id with new data post and update it.
            return posts.map(post => post._id === action.payload._id ? action.payload : post);
        default:
            break;
    }
    return posts;
}

export default posts;