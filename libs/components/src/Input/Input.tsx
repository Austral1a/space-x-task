import { FunctionComponent } from 'react';
import classes from './Input.module.scss';
import classnames from 'classnames';
import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    withIcon?: boolean;
    iconName?: string;
}

export const Input: FunctionComponent<InputProps> = ({
    className,
    withIcon,
    iconName,
    ...props
}) => {
    return (
        <div
            className={classnames(classes['input-container'], {
                [classes['input--with-icon']]: withIcon,
            })}
        >
            {withIcon ? <i className={iconName} /> : null}
            <input
                className={classnames(classes['input'], className)}
                {...props}
            />
        </div>
    );
};
