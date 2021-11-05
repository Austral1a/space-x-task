import classnames from 'classnames';
import { FunctionComponent } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import classes from './ShipmentItem.module.scss';

export interface ShipmentItemProps {
    itemLabel: string;
}

export const ShipmentItem: FunctionComponent<ShipmentItemProps> = ({
    itemLabel,
}) => {
    const searchParams = new URLSearchParams(useLocation().search);

    const companyName = searchParams.get('companyName');

    return (
        <NavLink
            to={`/shipments?companyName=${itemLabel}`}
            className={() => {
                return classnames(classes['shipment-item'], {
                    [classes['shipment-item--active']]:
                        companyName === itemLabel,
                });
            }}
        >
            <p>{itemLabel}</p>
        </NavLink>
    );
};
