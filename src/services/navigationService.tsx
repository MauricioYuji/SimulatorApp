import * as React from 'react';
import { DeviceEventEmitter } from 'react-native';
import { CommonActions } from '@react-navigation/native';



export const isMountedRef = React.createRef();
export const navigationRef = React.createRef();
export let navParams = null;

export function navigate(name: any, params: any = {}) {
    if (isMountedRef.current && navigationRef.current) {
        // Perform navigation if the app has mounted
        navigationRef.current.navigate(name, params);
        navigationRef.current.setParams(params)
        //DeviceEventEmitter.emit('currentRoute', name);
        //DeviceEventEmitter.emit('hideNav', true);
    } else {
        // You can decide what to do if the app hasn't mounted
        // You can ignore this, or add these actions to a queue you can call later
    }
}
export function navigationChange(e) {

    if (e.history != undefined) {
        const current = e.history.slice(-1).pop();
        const index = e.routes.findIndex((p: { key: any; }) => p.key == current.key);
        const obj = e.routes.find((p: { key: any; }) => p.key == current.key);
        const rota = obj.name;

        DeviceEventEmitter.emit('currentRoute', rota);

    }


}