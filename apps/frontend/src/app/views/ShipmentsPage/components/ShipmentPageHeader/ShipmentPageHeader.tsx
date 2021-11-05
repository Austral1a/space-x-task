import { Input } from '@shared/components';
import { FunctionComponent, useState } from 'react';

import { Shipment } from '../../queries';
import classes from './ShipmentPageHeader.module.scss';

export const SPACE_X_LOGO_URL = '/assets/logos/space-x-logo.svg';

export interface ShipmentPageHeaderProps {
    shipmentList?: Shipment[];
    setNewShipmentList: (newList: Shipment[]) => void;
    togglePanel: () => void;
}

export const ShipmentPageHeader: FunctionComponent<ShipmentPageHeaderProps> = ({
    setNewShipmentList,
    shipmentList,
    togglePanel,
}) => {
    const [companyNameInputVal, setCompanyNameInputVal] = useState('');

    return (
        <div className={classes['shipment-page__header']}>
            <div className={classes['shipment-page__header-menu-section']}>
                <img
                    src={SPACE_X_LOGO_URL}
                    alt="SpaceX Logo"
                    className={classes['shipment-page__header-logo']}
                />
                <i onClick={togglePanel} className={'pi pi-align-justify'} />
            </div>
            <Input
                className={classes['shipment-page__header-search-input']}
                placeholder={'Search'}
                onChange={(e) => {
                    setCompanyNameInputVal(e.target.value);

                    const newShipmentList = shipmentList?.filter((shipment) => {
                        return shipment.name
                            .toLocaleLowerCase()
                            .startsWith(e.target.value);
                    });

                    setNewShipmentList(newShipmentList as Shipment[]);
                }}
                value={companyNameInputVal}
                withIcon={true}
                iconName={'pi pi-search'}
            />
        </div>
    );
};
