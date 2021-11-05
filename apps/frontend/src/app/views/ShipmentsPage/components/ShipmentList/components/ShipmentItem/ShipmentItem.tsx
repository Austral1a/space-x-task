import classnames from 'classnames';
import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './ShipmentItem.module.scss';

export interface ShipmentItemProps {
    itemLabel: string;
}

export const ShipmentItem: FunctionComponent<ShipmentItemProps> = ({
    itemLabel,
}) => {
    return (
        <NavLink
            to={`/shipments?companyName=${itemLabel}`}
            className={({ isActive }) => {
                return classnames(classes['shipment-item'], {
                    [classes['shipment-item--active']]: isActive,
                });
            }}
        >
            <p>{itemLabel}</p>
        </NavLink>
    );
};
