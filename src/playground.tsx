import { useState } from 'react';
import Nav from './homework/nav';
import HomeworkSignIn from './homework/sign-in';
import HomeworkSignUp from './homework/sign-up';

// 리액트 외부 시스템 (부수적인 것: Side effects)
const getUIView = () => {
  const searchParams = new URLSearchParams(location.search);
  const uiView = searchParams.get('view') ?? 'signin';
  return uiView as UIView;
};

type UIView = 'signin' | 'signup';

function Playground() {
  // 상태 변수
  // Q. 상태 변수의 초깃값을 설정하고 싶은데....
  //    컴포넌트(함수) 몸체에는 부수적인 것은 작성하면 안된다네?
  //    그러면 어떻게 해야 상태 변수의 초깃값으로 부수적인 것의 데이터를 설정할 수 있을까?
  //
  // A. 초기화 함수를 사용해서 초기화 함수 내부에 리액트 외부의 것에 접근해 초깃값(데이터)을 반환하게 한다.
  // 3.
  const [uiView] = useState<UIView>(getUIView);

  // 1.
  // setUiView(nextUiView)

  // 2.
  // setUiView((prevUiView) => nextUiView)

  // 파생된 상태
  const isSignInView = uiView.includes('signin');

  return (
    <div className="Playground">
      <h1>플레이그라운드</h1>
      <Nav />
      {isSignInView ? <HomeworkSignIn /> : <HomeworkSignUp />}
    </div>
  );
}

export default Playground;
