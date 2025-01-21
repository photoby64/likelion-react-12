import bcrypt from 'bcrypt';
import express from 'express';
import { createUser } from './lib/user.js';



// Express {}
const app = express();
app.use(express.urlencoded({extended:false}));

app.post('/api/signup', async (request, response) => {
  const { username, useremail, userpassword } = request.body;

  if (!username || !useremail || !userpassword) {
    return response.status(400).send(`
      <p>회원 가입을 위해 이름, 이메일, 패스워드를 모두 입력해야 합니다.</p>  
    `);
  }
  
  try {
    const newUser = await createUser({
      name: username,
      email: useremail,
      password: userpassword,
    });

    if (newUser) {
      response.status(200).send(`<p>회원가입 되었습니다. 😃</p>`);
    } else {
      response.status(400).send(`<p>이미 가입된 이메일입니다. 😥</p>`);
    }
  } catch (error) {
    response.status(400).send(error);
  }
});

// 라우팅(Routing)
app.get('/api/hello', (request, response) => {
  const { username, useremail } = request.query;
  if (username && useremail) {
    response.status(200).send(`
      <h1>hello ${username}!</h1>
      <p>your email address is ${useremail}</p>
    `);
  } else {
    response
      .status(400)
      .send('<p>사용자 이름과 이메일이 전송되지 않았습니다. 😥</p>');
  }
});

app.listen(4000, () => {
  console.log('백엔드 프로그램 서버 구동 http://localhost:4000/api/hello');
});