'use strict';
/* @flow */

import { quantileSorted } from './quantile_sorted';
import { numericSort } from './numeric_sort';

/**
 * The [quantile](https://en.wikipedia.org/wiki/Quantile):
 * this is a population quantile, since we assume to know the entire
 * dataset in this library. This is an implementation of the
 * [Quantiles of a Population](http://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population)
 * algorithm from wikipedia.
 *
 * Sample is a one-dimensional array of numbers,
 * and p is either a decimal number from 0 to 1 or an array of decimal
 * numbers from 0 to 1.
 * In terms of a k/q quantile, p = k/q - it's just dealing with fractions or dealing
 * with decimal values.
 * When p is an array, the result of the function is also an array containing the appropriate
 * quantiles in input order
 *
 * @param {Array<number>} sample a sample from the population
 * @param {number} p the desired quantile, as a number between 0 and 1
 * @returns {number} quantile
 * @example
 * var data = [3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20];
 * quantile(data, 1); //= max(data);
 * quantile(data, 0); //= min(data);
 * quantile(data, 0.5); //= 9
 */
export function quantile(sample /*: Array<number> */, p /*: Array<number> | number */) {
    // Sort a copy of the array. We'll need a sorted array to index
    // the values in sorted order.
    var sorted = numericSort(sample);

    if (Array.isArray(p)) {
        // Initialize the result array
        var results = [];
        // For each requested quantile
        for (var i = 0; i < p.length; i++) {
            results[i] = quantileSorted(sorted, p[i]);
        }
        return results;
    } else {
        return quantileSorted(sorted, p);
    }
}
