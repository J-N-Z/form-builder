import { ITAssetsFull } from '../data/ITAssets';


export const getITAssets = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(ITAssetsFull);
        }, 1500);
    });
}

export const getITAsset = (id: any) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const asset = ITAssetsFull.find((item) => item.id === Number(id));
            if (asset) {
                resolve(asset);
            } else {
                reject('Ошибка. Такого ИТ-актива нет');
            } 
        }, 1500);
    });
}