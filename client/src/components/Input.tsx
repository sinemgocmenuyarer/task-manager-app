import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";

type InputProps =
  | (InputHTMLAttributes<HTMLInputElement> & {
      label: string;
      textarea?: false;
    })
  | (TextareaHTMLAttributes<HTMLTextAreaElement> & {
      label: string;
      textarea: true;
    });

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(function Input({ label, textarea, ...props }, ref) {
  const inputId = useId();
  return (
    <p className="form-field">
      <label className="form-label" htmlFor={inputId}>
        {label}
      </label>
      {textarea ? (
        <textarea
          id={inputId}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className="form-textarea"
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={inputId}
          ref={ref as React.Ref<HTMLInputElement>}
          className="form-input"
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </p>
  );
});
