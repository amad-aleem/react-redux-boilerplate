import baseService from './baseService.js';

export function getAllBreedList() {
    return baseService.get('/breeds/list/all');
}
