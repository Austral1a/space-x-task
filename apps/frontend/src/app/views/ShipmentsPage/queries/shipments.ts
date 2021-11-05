import { ApiClient } from '@shared/api-client';

export interface ShipmentsListResponse {
    shipments: Shipment[];
}

export interface Shipment {
    id: string;
    name: string;
    email: string;
    boxes: string;
}

export const getShipmentsList = async () => {
    return await ApiClient.get<ShipmentsListResponse>('assets/shipments.json', {
        baseURL: '',
    });
};
