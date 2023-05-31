const todos = [];
const mysql = require('mysql2/promise');


// const resolvers = {
//   Query: {
//     todos: () => todos,
//   },
//   Mutation: {
//     createTodo: (_, { title, description }) => {
//       const todo = {
//         id: String(todos.length + 1),
//         title,
//         description,
//         completed: false,
//       };
//       todos.push(todo);
//       return todo;
//     },
//   },
// };

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Computerupsc@123',
    database: 'sys',
  });

const resolvers = {
    Query: {
      posts: async () => {
        const conn = await pool.getConnection();
        const [rows] = await conn.query('SELECT * FROM posts');
        conn.release();
        return rows;
      },
    //   post: async (_, { id }) => {
    //     const conn = await pool.getConnection();
    //     const [rows] = await conn.query('SELECT * FROM posts WHERE id = ?', [id]);
    //     conn.release();
    //     return rows[0];
    //   },
    },
    Mutation: {
      createPost: async (_, { title, content, author }) => {
      //  const { title, content, author } = input;
        const conn = await pool.getConnection();
        console.log(title, content, author , "conn_____-")
        // console.log(conn, "conn_____-")
        const [result] = await conn.query('INSERT INTO posts (title, content, author) VALUES (?, ?, ?)', [title, content, author]);
        conn.release();
        return { id: result.insertId, title, content, author };
      },

    // createTodo: (_, { title, description }) => {
    //   const todo = {
    //     id: String(todos.length + 1),
    //     title,
    //     description,
    //     completed: false,
    //   };
    //   todos.push(todo);
    //   return todo;
    // },
      updatePost: async (_,{ id, input }) => {
        console.log(_, "__________________");
        const { title, content, author } = input;
        const conn = await pool.getConnection();
        await conn.query('UPDATE posts SET title = ?, content = ?, author = ? WHERE id = ?', [title, content, author, id]);
        conn.release();
        return { id, title, content, author };
      },
      deletePost: async (_, { id }) => {
        const conn = await pool.getConnection();
        await conn.query('DELETE FROM posts WHERE id = ?', [id]);
        conn.release();
        return id;
      },
    },
}

module.exports = resolvers;
