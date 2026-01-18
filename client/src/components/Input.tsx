import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  textarea?: boolean;
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  function Input({ label, textarea, ...props }, ref) {
    return (
      <p>
        <label>{label}</label>
        {textarea ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input ref={ref as React.Ref<HTMLInputElement>} {...props} />
        )}
      </p>
    );
  },
);

export default Input;
