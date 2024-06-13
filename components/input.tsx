import React from "react";

interface InputProps {
  id: string;
  onChange: any;
  value: string;
  placeholder?: string;
  label: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  onChange,
  placeholder,
  type,
  value,
}) => {
  const isValue = !!value;
  return (
    <div className="relative">
      <input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        className="block rounded-xl px-5 pt-5 pb-2 w-full text-base text-white bg-neutral-600 focus:outline-none focus:right-0 peer"
      />
      <label
        htmlFor={id}
        className={`absolute text-base -translate-y-1 origin-[0] text-zinc-400 top-4 z-10 left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:-translate-x-1 duration-150 transform ${
          isValue && "-translate-y-4 -translate-x-1 scale-75"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
