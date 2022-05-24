
//TIME Helpers

//voir https://www.w3schools.blog/date-object-typescript pour la doc de Date.

export const milisecond = 1;
export const sec = 1000 * milisecond;
export const minute = 60 * sec;
export const hour = 60 * minute;
export const day = 24 * hour;
export const week = 7 * day;

export const now = () => {
    return new Date().getTime();
}

export const newDateFromSeconds = (seconds:number) =>
{
    return new Date(seconds * sec);
}

export const addMinutes = (date:Date, addMinutes:number):Date =>
{
    date.setMinutes(date.getMinutes() + (addMinutes * minute));
    return date;
}