import nedb from 'nedb'

const authDb = new nedb({ filename: 'users.db', autoload: true })

export default authDb