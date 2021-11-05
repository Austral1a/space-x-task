import classnames from 'classnames';
import { FunctionComponent } from 'react';

import { Shipment } from '../../queries';
import { ShipmentItem } from './components/ShipmentItem';
import classes from './ShipmentList.module.scss';

export interface ShipmentListProps {
    shipmentListItems?: Shipment[];
    className?: string;
}

export const ShipmentList: FunctionComponent<ShipmentListProps> = ({
    shipmentListItems,
    className,
}) => {
    return (
        <div className={classnames(className, classes['shipment-list'])}>
            <h4>SHIPMENT LIST</h4>
            <div className={classes['shipment-list__list']}>
                {shipmentListItems?.map((item) => {
                    return (
                        <ShipmentItem key={item.name} itemLabel={item.name} />
                    );
                })}
            </div>
        </div>
    );
};
