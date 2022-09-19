import { atom } from 'nanostores';

export const colors = {
    'light-1': '#F5F6F4',
    'light-2': '#E0E2DB',
    'light-3': '#D2D4C8',
    'dark-1':  '#30321C',
    'accent-1': '#C585B3',
    'accent-2': '#BC69AA',
}

export const getColors = (light: boolean) => {
    return light 
        ? {backgroundColor: colors['light-2'], foregroundColor: colors['dark-1']} 
        : {backgroundColor: colors['dark-1'], foregroundColor: colors['light-2']};
}

export const isLight = atom<boolean>(true);

export const isLightSubscribe = (cb) => {
    isLight.subscribe(cb);
}

export const changeIsLight = () => {
    console.log('changeIsLight');
    console.log('isLight.get()', isLight.get());
    isLight.set(!isLight.get())
};