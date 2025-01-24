import { useState } from 'react';
import FormInput from '@/components/form-input';
import FormTextArea from '@/components/form-textarea';

const initialFormData = {
  limitAge: 40,
  profileImage: null,
  photos: [],
  hobbies: [
    {
      name: 'userhobby',
      label: '공부',
      value: 'study',
      checked: true,
    },
    {
      name: 'userhobby',
      label: '영화 감상',
      value: 'watch-a-movie',
      checked: false,
    },
    {
      name: 'userhobby',
      label: '운동',
      value: 'helth',
      checked: false,
    },
    {
      name: 'userhobby',
      label: '바디 프로필 촬영',
      value: 'photo-body-profile',
      checked: true,
    },
  ],
};

function ReactForm() {
  // 현재 관리되는 폼 데이터 상태: limitAge, profileImage, photos, hobbyList

  const handleResetForm = () => {
    setLimitAge(initialFormData.limitAge);
    setProfileImage(initialFormData.profileImage);
    setPhotos(initialFormData.photos);
    setHobbyList(initialFormData.hobbies);
  };

  const [limitAge, setLimitAge] = useState<number>(initialFormData.limitAge);

  const [profileImage, setProfileImage] = useState<string | null>(
    initialFormData.profileImage
  );

  const handleUploadProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;

    if (target.files && target.files.length > 0) {
      const file = target.files.item(0);
      if (file) {
        setProfileImage(URL.createObjectURL(file));
      }
    }
  };

  // 컴포넌트 상태 변수 (state variable: 컴포넌트 외부의 상태 관리 시스템 기억)
  const [photos, setPhotos] = useState<File[]>(initialFormData.photos);

  // 파생된 상태 변수 (derived state variable)
  const photoURLs = photos.map((photo) => URL.createObjectURL(photo));

  // 상태 업데이트 핸들러 (이벤트 감지되면 실행)
  const handleUploadPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      setPhotos(Object.values(fileList)); // [File, File, ...]
    }
  };

  // checkbox input state (checked)
  // 배열
  // Checkbox { id?, name, label, value, checked }
  // Checkbox[]
  const [hobbyList, setHobbyList] = useState(initialFormData.hobbies);

  // derived state
  // - 모두 체크 되었나?
  const isAllCheckedHobbyList = hobbyList.every((hobby) => hobby.checked);
  console.log({ isAllCheckedHobbyList });
  // - 모두 체크 안되었나?
  const isNotAllCheckedHobbyList = hobbyList.every((hobby) => !hobby.checked);
  console.log({ isNotAllCheckedHobbyList });

  const handleCheckedHobbies = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked: nextCheckedValue } = e.target;

    const nextHobbyList = hobbyList.map((hobby) => {
      if (hobby.value === value) {
        return {
          ...hobby,
          checked: nextCheckedValue,
        };
      } else {
        return hobby;
      }
    });

    setHobbyList(nextHobbyList);
  };

  return (
    <div className="ReactForm">
      <h2>React 폼(form)</h2>

      <form style={formStyles}>
        {/* type=radio */}
        <fieldset>
          <legend>성별</legend>
          <div
            style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'space-between',
            }}
          >
            <FormInput
              type="radio"
              label="여성"
              name="usergender"
              value="female"
              defaultChecked
            />
            <FormInput
              type="radio"
              label="남성"
              name="usergender"
              value="male"
            />
          </div>
        </fieldset>

        {/* type=checkbox */}
        <fieldset>
          <legend>취미</legend>
          {hobbyList.map((hobby) => (
            <FormInput
              key={hobby.label}
              type="checkbox"
              label={hobby.label}
              name={hobby.name}
              value={hobby.value}
              checked={hobby.checked}
              onChange={handleCheckedHobbies}
            />
          ))}
        </fieldset>

        {/* type=text */}
        <FormInput label="이름" placeholder="박수무당" />

        {/* type=password */}
        <FormInput
          type="password"
          label="비밀번호"
          placeholder="영어, 숫자 조합 4자리 이상"
        />

        {/* type=email */}
        <FormInput type="email" label="이메일" placeholder="user@company.io" />

        {/* type=number, controlled component */}
        <FormInput type="number" label="나이" defaultValue={24} />

        {/* type=color */}
        <FormInput type="color" label="색상" defaultValue="#ffffff" />

        {/* type=range */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <FormInput
            type="range"
            label="시청 허용 나이"
            min={10}
            max={90}
            step={10}
            value={limitAge}
            onChange={(e) => {
              const { value } = e.target;
              setLimitAge(parseInt(value, 10));
            }}
          />
          <output>{limitAge}</output>
        </div>

        {/* type=date */}
        <FormInput type="date" label="여행 날짜" />

        {/* type=datetime-local */}
        <FormInput type="datetime-local" label="비행기 출국 시간" />

        <FormTextArea
          label="인사말"
          name="contents"
          placeholder="사랑하는 이들에게 따뜻한 말을 전해주세요~"
          resize="vertical"
        />
        <FormTextArea
          label="프로포즈"
          name="propose"
          placeholder="아름답고 서정적인 대화로 마음을 훔치세요~"
          resize="horizontal"
        />

        {/* type=file (1) */}
        <div style={{ padding: 12, border: '0.5px solid rgba(0 0 0 / 30%)' }}>
          <FormInput
            type="file"
            label="프로필"
            accept="image/*"
            onChange={handleUploadProfile}
          />
          {profileImage && (
            <img
              style={{ marginBlockStart: 8 }}
              src={profileImage}
              alt="업로드 할 프로필"
              width={100}
              height={100}
            />
          )}
        </div>

        {/* type=file (N) */}
        <div style={{ padding: 12, border: '0.5px solid rgba(0 0 0 / 30%)' }}>
          <FormInput
            type="file"
            label="포토"
            accept=".jpg, .jpeg, .png"
            multiple
            onChange={handleUploadPhotos}
          />
          {photos.length > 0
            ? photos.map(({ name }, index) => (
                <img
                  key={name}
                  style={{ marginBlockStart: 8 }}
                  src={photoURLs.at(index)}
                  alt={name}
                  width={68}
                  height={68}
                />
              ))
            : null}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit">제출</button>
          <button type="reset" onClick={handleResetForm}>
            초기화
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReactForm;

const formStyles = {
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'start',
  gap: 20,
};