const {Pub} = require("../database");

module.exports = {
    getAll: async (query, queryStr) => {
        const {
            page = 1,
            limit = 12,
            sortBy = 'createdAt',
            order = 'asc',
            ...filters
        } = query;

        const orderBy = order === 'asc' ? -1 : 1;

        // const search = () => {
        //     const keyword = queryStr.keyword ? {
        //         name: {
        //             $regex: queryStr.keyword,
        //             $options: 'i'
        //         }
        //     } : {}
        // }

        const filterObject = {};
        const orderFilter = {}

        Object.keys(filters).forEach((filterParam) => {
            switch (filterParam) {
                case 'isActivated': {
                    const rolesArr = filters.isActivated.split(';');
                    filterObject.isActivated = {$in: rolesArr};

                    filterObject.isActivated = filters.isActivated;
                    break;
                }
                case 'category': {
                    const rolesArr = filters.category.split(';');
                    filterObject.category = {$in: rolesArr};

                    filterObject.category = filters.category;
                    break;
                }
                case 'order.lte': {
                    Object.assign(orderFilter, {$lte: +filters['order.lte']})
                    break;
                }
                case 'order.gte': {
                    Object.assign(orderFilter, {$gte: +filters['order.gte']})
                    break;
                }
                default: {
                    filterObject[filterParam] = filters[filterParam];
                }
            }
        });

        if (Object.keys(orderFilter).length) {
            filterObject.order = orderFilter
        }


        const pubs = await Pub
            .find(filterObject)
            .sort({[sortBy]: orderBy})
            .limit(+limit)
            .skip((page - 1) * limit);


        return pubs;
    }
};
