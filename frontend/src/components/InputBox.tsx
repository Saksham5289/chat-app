import { InputHTMLAttributes } from "react";

interface InputBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
export function InputBox({label, ...rest}:InputBoxProps) {
    return <div>
      <div className="text-sm font-medium text-left py-2">
        {label}
      </div>
      <input {...rest} className="w-full px-2 py-1 border rounded border-slate-200" />
    </div>
}