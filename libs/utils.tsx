import { es } from 'date-fns/locale';
import { format, isDate, parseISO, startOfDay, subDays } from 'date-fns';
import dayjs, { ManipulateType } from 'dayjs';

// Validador de inputs en formulario
export function isFormFieldInvalid(name: any, form: any) {
    return !!(form.touched[name] && form.errors[name]);
}

// Mensaje error en input de formulario
export function getFormErrorMessage(name: any, form: any) {
    return isFormFieldInvalid(name, form) ? <small className="p-error">{form.errors[name]}</small> : null;
}

// Validar email
export function validatorEmail(email: string) {
    const reg = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/;
    return reg.test(email);
}

// format Currency
export function formatCurrency(value: any, digits = 0) {
    return value.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: digits });
}

// Format hour
export function formatHour(value: any, formater = 'HH:mm') {
    const hour = format(value, formater, { locale: es });
    return hour;
}

// Format date
export function formatDate(value: any, formater = 'yyyy/LL/dd') {
    let date = '';
    date = isDate(value) ? format(value, formater, { locale: es }) : format(parseISO(value), formater, { locale: es });
    return date;
}

// get date now
export function getDateNow(formater = 'yyyy/LL/dd') {
    const now = format(new Date(), formater, { locale: es });
    return now;
}

// Get date minus days
export function getDateMinus(days = 1, formater = 'yyyy/LL/dd') {
    const now = format(startOfDay(subDays(new Date(), days)), formater, { locale: es });
    return now;
}

// validate object empty
export function isObjectEmpty(objectName: any) {
    return Object.keys(objectName).length === 0;
}

// clear space in string
export function clearAllSpaces(value: string) {
    return value.replace(/\s+/g, '');
}

// Get date now dayjs
export function DateNow() {
    return dayjs().toDate();
}

// Get date dayjs
export function DateDaysJS(value: string) {
    return dayjs(value).toDate();
}

// Get date now and minus dayjs
export function DateMinus(subtract = 1, typeSubtract: ManipulateType = 'days') {
    return dayjs().subtract(subtract, typeSubtract).toDate();
}

// Get years two dates
export function GetYears(date: any, nowDate = dayjs()) {
    return nowDate.diff(dayjs(date), 'years');
}

// Clear accents
export function removeAccents(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
