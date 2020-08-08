import { Injectable } from '@angular/core';
import { STANDARD_API_STRUCTURE_CONSTANTS } from './standard-api-structure-const';
import qs from 'qs'

@Injectable({
  providedIn: 'root'
})
export class StandardApiStructureManagerService {

  constructor() { }

  standardStructureStringToJson(queryString) {
    return qs.parse(queryString);
  }

  getStandardAPIStructureJson(request) {
    const requestPath = request.route.path;
    const queryString = request.query;
    const queryStringJson = this.standardStructureStringToJson(queryString);
    queryStringJson[STANDARD_API_STRUCTURE_CONSTANTS.PARAM_REQUEST_PATH] = requestPath;
    return queryStringJson;
  }

  standardStructureJsonToString(standardJson) {
    return qs.stringify(standardJson);
  }

  // getPaginationJson description
  // @param  {number} offset [specify position where to start]
  // @param  {number} limit  [specify limit for number of record needed]

  // this method will genrate json object for pagination
  // example-   offset ='$eq', limit = 3
  //  => {"offset":2,"limit":2}
  getPaginationJson(offset, limit) {
    const pagination = {};
    pagination[STANDARD_API_STRUCTURE_CONSTANTS.PARAM_OFFSET] = offset;
    pagination[STANDARD_API_STRUCTURE_CONSTANTS.PARAM_LIMIT] = limit;
    return pagination;
  }

  // getFilterQueryJson description
  // @param {string} field [specify field to apply filter on]
  // @param {operator} op [specify operator to use for filter]
  // @param {number/string} value [specify filter value]

  // this method will genrate json object for filter
  // example-   field ='job_id', op='eq', value = 1
  //  => {"job-id":{"eq":1}}
  getFilterQueryJson(field, op, value) {
    const query = {};
    const opValueJson = {};
    opValueJson[op] = value;
    if (op === STANDARD_API_STRUCTURE_CONSTANTS.PARAM_REGEX) {
      opValueJson[STANDARD_API_STRUCTURE_CONSTANTS.PARAM_OPTIONS] = 'i'
    }
    query[field] = opValueJson;
    return query;
  }
  getFilterJsonForContainsOp(array, op, values) {
    const query = {};
    query[STANDARD_API_STRUCTURE_CONSTANTS.PARAM_ARRAY] = array;
    query[STANDARD_API_STRUCTURE_CONSTANTS.PARAM_CONTAINS] = op;
    query[STANDARD_API_STRUCTURE_CONSTANTS.PARAM_VALUES] = values;
    return query;
  }
  getFilterJsonForElemMatchOp(array, queryJson) {
    const query = {};
    query[STANDARD_API_STRUCTURE_CONSTANTS.PARAM_ARRAY] = array;
    query[STANDARD_API_STRUCTURE_CONSTANTS.PARAM_ELEM_MATCH] = queryJson;
    return query;
  }
  getArrayOpFilterJson(op, queryJsonArray) {
    const arrayOpQueryJson = {};
    arrayOpQueryJson[op] = queryJsonArray;
    return arrayOpQueryJson;
  }

  // getProjectionJson description
  // @param {array} fields [specify fields for projection]

  // this method will genrate json object for projection
  // example-   fields =['job_id','jobs']
  //  => "job_id,jobs"
  getProjectionJson(fields) {
    return fields.toString();
  }

  // getSortJson description
  // @param {string} field [specify field to sort]
  // @param {string} sortType [specify type of sort]

  // this method will generate json object for sort
  // example-   fields =['job_id','asc']
  // {"job_id":"asc"}
  getSortJson(field, sortType) {
    const sortJson = {};
    sortJson[field] = sortType;
    return sortJson;
  }

  // @param {object} pagination [json object from paginatin]
  // @param {object} filter [json object from filter]
  // @param {object} projection [json object from projection]
  // @param {object} sort [json object from sort]

  // this method will generate querystring
  // offset=2&limit=2&filter%5Bjob-id%5D%5Beq%5D=1&fields=job_id%2Cjobs&sort%5Bjob_id%5D=asc
  getStandardStructureQueryString(pagination, filter, projection, sort) {
    let standardApiStructure = {};
    if (pagination) {
      standardApiStructure = pagination;
    }
    if (filter) {
      standardApiStructure[STANDARD_API_STRUCTURE_CONSTANTS.PARAM_FILTER] = filter;
    }
    if (projection) {
      standardApiStructure[STANDARD_API_STRUCTURE_CONSTANTS.PARAM_FIELDS] = projection;
    }
    if (sort) {
      standardApiStructure[STANDARD_API_STRUCTURE_CONSTANTS.PARAM_SORT] = sort;
    }
    return this.standardStructureJsonToString(standardApiStructure);
  }
}
