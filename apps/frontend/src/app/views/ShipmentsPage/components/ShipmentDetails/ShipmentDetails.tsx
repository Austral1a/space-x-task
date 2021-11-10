import { Input } from '@shared/components';
import classnames from 'classnames';
import { FunctionComponent, useEffect, useMemo, useState } from 'react';

import { Shipment } from '../../queries';
import classes from './ShipmentDetails.module.scss';

export interface ShipmentDetailsProps {
    className?: string;
    shipmentDetails?: Shipment;
}

const calculateCargoBoxesNumber = (cargoBoxes: string | undefined) => {
    if (!cargoBoxes) {
        return null;
    }

    return Math.ceil(
        Number(
            cargoBoxes
                .split(',')
                .map((val) => Number(val))
                .reduce((acc, number) => {
                    return acc + number;
                }) / 10
        )
    );
};

export const ShipmentDetails: FunctionComponent<ShipmentDetailsProps> = ({
    className,
    shipmentDetails,
}) => {
    const [cargoBoxesAmount, setCargoBoxesAmount] = useState<null | number>(
        null
    );

    const [cargoBoxesInputVal, setCargoBoxesInputVal] = useState<string>('');

    useEffect(() => {
        setCargoBoxesInputVal(shipmentDetails?.boxes ?? '');

        setCargoBoxesAmount(
            calculateCargoBoxesNumber(shipmentDetails?.boxes ?? '')
        );
    }, [shipmentDetails?.boxes]);

    const cargoBoxesAmountText = useMemo(() => {
        if (Number.isNaN(cargoBoxesAmount)) {
            return 'Not valid data';
        }

        if (!cargoBoxesAmount) {
            return '-';
        }

        return cargoBoxesAmount;
    }, [cargoBoxesAmount]);

    return (
        <div className={classnames(className, classes['shipment-details'])}>
            <div className={classes['shipment-details__heading']}>
                <h1 className={classes['shipment-details__company-name']}>
                    {shipmentDetails?.name}
                </h1>
                <p>{shipmentDetails?.email}</p>
            </div>

            <div className={classes['shipment-details__body']}>
                <p>CARGO BOXES</p>
                <Input
                    onChange={(e) => {
                        const filteredValue = e.target.value.replace(
                            /[^0-9.,]}/,
                            ''
                        );

                        setCargoBoxesInputVal(filteredValue);

                        setCargoBoxesAmount(
                            calculateCargoBoxesNumber(filteredValue)
                        );
                    }}
                    className={classes['shipment-details__input']}
                    value={cargoBoxesInputVal}
                    type="text"
                />
            </div>

            <div className={classes['shipment-details__footer']}>
                <h2>Number of required cargo bays</h2>
                <p>{cargoBoxesAmountText}</p>
            </div>
        </div>
    );
};
