function SignUpForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 브라우저 기본 작동 중지
    e.preventDefault();

    // 폼 데이터 구하기

    const formData = new FormData(e.currentTarget); // FormData
    // const formDataObject = Object.fromEntries(formData); // Object

    // 서버에 요청
    // Fetch API `fetch()` or Axios Library `axios.post()`

    // Promise API
    // fetch('http://localhost:4000/api/signup', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    //   body: formData,
    // })
    //   .then((response) => console.log(response))
    //   .catch((error) => console.error(error));

    // Async Await
    try {
      const response = await fetch('http://localhost:4000/api/signup', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error(error);
    }

    // 서버에서 응답

    // UI에 반영
  };

  return (
    <section style={{ marginInline: 48 }}>
      <h2>회원가입 폼 (POST 메서드)</h2>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit}
        // action="http://localhost:4000/api/signup"
        // encType="multipart/form-data"
        // method="POST"
      >
        <div style={{ marginBlockEnd: 8 }}>
          <label htmlFor="usernameSignUp">이름</label>
          <input type="text" name="username" id="usernameSignUp" />
        </div>
        <div style={{ marginBlockEnd: 8 }}>
          <label htmlFor="userEmailSignUp">이메일</label>
          <input type="email" name="useremail" id="userEmailSignUp" />
        </div>
        <div style={{ marginBlockEnd: 8 }}>
          <label htmlFor="userPasswordSignUp">패스워드</label>
          <input type="password" name="userpassword" id="userPasswordSignUp" />
        </div>
        <div style={{ marginBlockEnd: 8 }}>
          <label htmlFor="userProfileSignUp">프로필 이미지</label>
          <input
            type="file"
            name="userprofile"
            id="userProfileSignUp"
            accept=".jpg,.jpeg,.png,.svg,.webp"
          />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </section>
  );
}

export default SignUpForm;
