import classNames from "classnames";
import { ReactComponent as SearchSvg } from "../../assets/search.svg";

import s from "./Input.module.css";

interface Props {
  onChange: (value: string) => void;
  placeholder?: string;
  value?: string;
  showIcon?: boolean;
  className?: string;
}

export const Input = ({
  onChange,
  value,
  placeholder,
  showIcon,
  className,
}: Props) => {
  return (
    <div className={classNames(s.inputContainer, className)}>
      {showIcon && <SearchSvg className={s.icon} />}
      <input
        className={s.input}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
