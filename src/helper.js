export default class Helper {
    /**
     * This function will return group by day with orderslist based on productId
     * @param {*} paramProductId 
     * @param {*} data 
     * @returns 
     */
    groupByDay(paramProductId, data) {
        var output = [];
        data.forEach(function (item) {
            const date = item.creationDate.split('T')[0]
            var existing = output.filter(function (v, i) {
                return v.creationDate == item.creationDate.split('T')[0];
            });
            if (existing.length) {
                var existingIndex = output.indexOf(existing[0]);
                output[existingIndex].orderLines.map((i) => {
                    output[existingIndex].orderLines = output[existingIndex].orderLines.concat(item.orderLines);
                })
            } else {
                item.creationDate = date;
                var i = item.orderLines.map((i) => {
                    if (i.productId == paramProductId)
                        return i;
                })
                item.orderLines = i;
                output.push(item);
            }
        });
        var d = output.map((i) => {
            i.creationDate = i.creationDate;
            i.day = new Date(i.creationDate).toLocaleString('en-us', { weekday: 'long' }).toUpperCase()
            i.orderLines = i.orderLines.filter(x => x !== undefined && x.productId == paramProductId)
            return i
        })
        var grouped = d.reduce(function (r, a) {
            r[a.day] = r[a.day] || [];
            if (a.orderLines.length > 0)
                r[a.day].push(a);
            return r;
        }, Object.create(null));
        return grouped;
    }
    /**
     * This function will returns sum of all quantity of an array
     */
    makeSum(array) {
        var output = [];
        array.map((item, index) => {
            output = output.concat(item.orderLines);
        })
        const sum = Array.from(output.reduce((a, { productId, quantity }) => {
            return a.set(productId, (a.get(productId) || 0) + quantity);
        }, new Map())
        ).map(([productId, sum]) => ({ sum }));
        return sum[0].sum;
    }
}