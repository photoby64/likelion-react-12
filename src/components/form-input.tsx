import { useId, type ComponentProps } from 'react';

// interface FormInputProps extends ComponentProps<'input'> {
//   label: string;
// }

// type FormInputProps = ComponentProps<'input'> & {
//   label: string;
// };

function FormInput({
  label,
  ...restProps
}: ComponentProps<'input'> & {
  label: string;
}) {
  const inputId = useId();

  return (
    <div className="formControl">
      <label htmlFor={inputId}>{label}</label>
      <input id={inputId} {...restProps} />
    </div>
  );
}

export default FormInput;
