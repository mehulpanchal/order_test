/* 

  Write solution to count number of units sold a day for a specific product at everyday of the week.
  Make sure to run test to check if your solution pass the test. ` npm run test `
  Test code already provided/written.
  
  INPUT:
  ProductID: @type: Number
  Orders Data: @type: Array[]
  
  [{
      "orderId": 122,
      "creationDate": "2017-03-25T11:24:20Z",
      "orderLines": [
        { "productId": 9870, "name": "Pencil", "quantity": 2, "unitPrice": 3.00 },
        { "productId": 1746, "name": "Eraser", "quantity": 1, "unitPrice": 1.00 }
      ]
  }, {
      "orderId": 123,
      "creationDate": "2017-03-26T11:24:20Z",
      "orderLines": [
        { "productId": 9871, "name": "Pen", "quantity": 3, "unitPrice": 3.00 },
        { "productId": 1746, "name": "Eraser", "quantity": 1, "unitPrice": 1.00 }
      ]
  }..... N ]


  _______________________________

  Output:
  {
      SUNDAY: 5
      MONDAY: 2
      TUESDAY: 0
      WEDNESDAY: 3
      THURSDAY: 2
      FRIDAY: 6
      SATURDAY: 4
  }
*/

const { orders } = require('../test/stationery-data.json');
import Helper from "../src/helper";
export default class OrdersAnalyzer {
  constructor() {
    this.weekdays = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];
    this.helper = new Helper();
  }

  totalQuantity(paramProductId, orders) {
    // 1.create an output object that holds the result
    let output = {};
    const all = this.helper.groupByDay(paramProductId, orders);
    //   2. loop over the weekdays and assign each day as key and its value is 0 in the output
    this.weekdays.map(weekday => {
      output[weekday] = 0;
      Object.keys(all).map((order) => {
        if (weekday === order && order !== undefined && all[order].length > 0) {          
            output[weekday] = this.helper.makeSum(all[order]);          
        }
      });
    })
    return output;
  }
}

