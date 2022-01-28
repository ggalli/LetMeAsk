import { ButtonHTMLAttributes } from "react";
import classnames from 'classnames';

import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  outlined?: boolean
  raised?: boolean
  primary?: boolean
  danger?: boolean
  neutral?: boolean
};

export function Button({ 
  outlined = false, 
  raised = false, 
  primary = false, 
  danger = false, 
  neutral = false, 
  ...props 
}: ButtonProps) {
  return (
    <button 
      className={classnames(
        'button',
        {
          outlined: outlined, 
          raised: raised,
          primary: primary,
          danger: danger,
          neutral: neutral,
        },
      )} 
      {...props}
    />
  )
}