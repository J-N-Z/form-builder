import { ToastStatus } from '../types';

export const getToastObj = (title: string, text: string, status: ToastStatus) => ({
    status,
    title,
    children: text,
    isClosable: true,
    displayStatusIcon: true,
});