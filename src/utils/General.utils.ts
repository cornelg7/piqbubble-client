export const colors = {
    'light-1': '#F5F6F4',
    'light-2': '#E0E2DB',
    'light-3': '#D2D4C8',
    'dark-1':  '#30321C',
    'accent-1': '#C585B3',
    'accent-2': '#BC69AA',
    'color-logo-1': '#756d75',
    'color-logo-2': '#c586b3',
}

export const getColors = (light: boolean) => {
    return light 
        ? {backgroundColor: colors['light-2'], foregroundColor: colors['dark-1']} 
        : {backgroundColor: colors['dark-1'], foregroundColor: colors['light-2']};
}
