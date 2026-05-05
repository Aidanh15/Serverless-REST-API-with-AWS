const getUserId = (headers) => {
    return headers.app_user_id;
}

const getUserName = (headers) => {
    return headers.app_user_name;
}


const getResponseHeaders = () => {
    return {
        'Access-Control-Allow-Origin' : process.env.ALLOWED_ORIGIN || 'https://example.com'
    }
}

module.exports = {
    getUserId, 
    getUserName,
    getResponseHeaders
    
}
