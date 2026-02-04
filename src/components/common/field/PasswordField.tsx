import { Eye, EyeOff, Lock } from "lucide-react";
import * as React from "react";
import TextField, { TextFieldProps } from "./TextField";
import { useState } from "react";

type PasswordFieldProps = Omit<
  TextFieldProps,
  "type" | "icon" | "endAdornment"
>;

function PasswordField(props: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <TextField
      {...props}
      type={show ? "text" : "password"}
      icon={Lock}
      endAdornment={
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="text-slate-400 hover:text-slate-600"
          aria-label={show ? "비밀번호 숨기기" : "비밀번호 보기"}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      }
    />
  );
}

export default PasswordField;
