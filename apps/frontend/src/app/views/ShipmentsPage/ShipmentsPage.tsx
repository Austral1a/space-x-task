import {
    FunctionComponent,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

import {
    ShipmentDetails,
    ShipmentList,
    ShipmentPageHeader,
    SPACE_X_LOGO_URL,
} from './components';
import { getShipmentsList, Shipment } from './queries';
import classes from './ShipmentsPage.module.scss';

export const ShipmentsPage: FunctionComponent = () => {
    const { data } = useQuery('getShipmentsList', async () =>
        getShipmentsList()
    );

    const searchParams = new URLSearchParams(useLocation().search);

    const companyName = searchParams.get('companyName');

    const currentShipmentDetails = useMemo(() => {
        let shipmentDetails;

        data?.data.shipments.forEach((shipment) => {
            if (shipment.name === companyName) {
                shipmentDetails = shipment;
            }
        });

        return shipmentDetails;
    }, [companyName, data?.data.shipments]);

    const [shipmentList, setShipmentList] = useState<Shipment[]>([]);

    const handleSetNewShipmentList = useCallback((newList: Shipment[]) => {
        setShipmentList(newList);
    }, []);

    const [isPanelOpened, setIsPanelOpened] = useState(false);

    useEffect(() => {
        if (!data?.data.shipments) {
            return;
        }

        handleSetNewShipmentList(data.data.shipments);
    }, [data?.data.shipments, handleSetNewShipmentList]);

    return (
        <div className={classes['shipment-page']}>
            <ShipmentPageHeader
                togglePanel={() => setIsPanelOpened(!isPanelOpened)}
                shipmentList={data?.data.shipments}
                setNewShipmentList={handleSetNewShipmentList}
            />

            <div className={classes['shipment-page__body']}>
                {isPanelOpened && (
                    <div
                        className={
                            classes['shipment-page__shipments-list-container-m']
                        }
                    >
                        <div
                            className={
                                classes[
                                    'shipment-page__shipments-list-container-m-header'
                                ]
                            }
                        >
                            <img
                                src={SPACE_X_LOGO_URL}
                                alt="SpaceX Logo"
                                className={
                                    classes['shipment-page__header-logo']
                                }
                            />
                            <i
                                onClick={() => setIsPanelOpened(false)}
                                className={'pi pi-times'}
                            />
                        </div>
                        <ShipmentList
                            className={
                                classes['shipment-page__shipments-list-m']
                            }
                            shipmentListItems={shipmentList}
                        />
                    </div>
                )}

                <ShipmentList
                    className={classes['shipment-page__shipments-list']}
                    shipmentListItems={shipmentList}
                />
                <div className={classes['shipment-page__content-container']}>
                    <ShipmentDetails
                        shipmentDetails={currentShipmentDetails}
                        className={classes['shipment-page__content']}
                    />
                </div>
            </div>
        </div>
    );
};
