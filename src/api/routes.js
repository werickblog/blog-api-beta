export default {
    'root': '/api/v1',
    'articles': {
        'fetch-all': '/articles',
        'fetch-one': '/articles/:article_slug',
        'update-one': '/articles/edit/:article_slug',
        'delete-one': '/articles/trash/:article_slug'
    },
    'auth': {
        'login': '/access',
        'signup': '/add',
        'fetch': '/fetch-user/:user_id'
    }
}