class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    console.log(keyword);

    this.query = this.query.find({ ...keyword });

    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    console.log(queryCopy);

    // Removing fields from the query
    // category wise search korte gele shekhane "keyword", "limit", "page" egulor dorkar nai.. tai query theke egulo remove korte hobe
    const removeFields = ["keyword", "limit", "page"];

    // for loop chalano hocche . ek ek ta element  el variable hishebe define kora hoise.  queryCopy theke oi el  defined element ta remove kora hobe.
    removeFields.forEach((el) => delete queryCopy[el]);

    //console.log(queryCopy);

    // Advance filter for price, ratings etc
    //get the priced product between 100-200$

    // queryCopy ekta object jake string a convert kora hocche
    let queryStr = JSON.stringify(queryCopy);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    console.log(queryStr);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
