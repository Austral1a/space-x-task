import { FunctionComponent } from 'react';
import classes from './Input.module.scss';
import classnames from 'classnames';
import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    withIcon?: boolean;
    iconName?: string;
    onIconClick?: () => void;
}

export const Input: FunctionComponent<InputProps> = ({
    className,
    withIcon,
    iconName,
    onIconClick,
    ...props
}) => {
    return (
        <div
            className={classnames(classes['input-container'], {
                [classes['input--with-icon']]: withIcon,
            })}
        >
            {withIcon ? <i onClick={onIconClick} className={iconName} /> : null}
            <input
                className={classnames(classes['input'], className)}
                {...props}
            />
        </div>
    );
};
