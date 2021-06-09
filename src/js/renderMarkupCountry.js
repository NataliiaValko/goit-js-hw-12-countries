import fetchCountries from './fetchCountries';
import refs from './refs';
import countryCardTpl from '../templates/country-card.hbs';
import countriesListTpl from '../templates/countries-list.hbs';
import pnotify from './pnotify';

const debounce = require('lodash.debounce');
const moreSpecificMessage = 'Too many matches found. Please enter a more specific query!';
const invalidMessage = 'Sorry we couldn’t find anything =/. Change your request, please!';

const clearPage = () => refs.result.innerHTML = '';

const requestValidation = (request) => {
    if (request.status !== 404) {
        return request
    }
}

const showMessage = (message) => {
    pnotify(message);
    clearPage()
}

const showInvalidMessage = () => {
    showMessage(invalidMessage)
}

const resultMoreTen = (array) => {
    return array.length > 10
        ? showMessage(moreSpecificMessage)
        :array
}

const resultMoreOne = (array) => {
    return array && array.length > 1 && array.length < 10
        ? markupСountriesList(array)
        :array
}

const markupСountriesList = array => {
        refs.result.innerHTML = countriesListTpl(array)
}

const createsResultTpl = array => {
    if (array) {
        refs.result.innerHTML = countryCardTpl(array[0])
    }
}

const markupCountryResult = (e) => {
    const value = e.target.value.trim();
    return !value
        ? clearPage()
        : fetchCountries(value)
            .then(requestValidation)
            .then(resultMoreTen)
            .then(resultMoreOne)
            .then(createsResultTpl)
            .catch(showInvalidMessage)
}

refs.input.addEventListener('input', debounce(markupCountryResult, 500));