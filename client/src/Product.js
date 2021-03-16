import snackpass_logo from './assets/snackpass-logo.png'

const Product = ({ order }) => {

    // TODO: Edit time data to be within 3 days
    // TODO: Use current time to calculate last ordered?
    // TODO: Define recently for X purchased recently

      // Function copied from https://www.geeksforgeeks.org/get-the-relative-timestamp-difference-between-dates-in-javascript/
  function timeDiff(curr, prev) { 
    var ms_Min = 60 * 1000; // milliseconds in Minute 
    var ms_Hour = ms_Min * 60; // milliseconds in Hour 
    var ms_Day = ms_Hour * 24; // milliseconds in day 
    var ms_Mon = ms_Day * 30; // milliseconds in Month 
    var ms_Yr = ms_Day * 365; // milliseconds in Year 
    var diff = curr - prev; //difference between dates. 
    // If the diff is less then milliseconds in a minute 
    if (diff < ms_Min) { 
        return Math.round(diff / 1000) + ' seconds ago'; 

        // If the diff is less then milliseconds in a Hour 
    } else if (diff < ms_Hour) { 
        return Math.round(diff / ms_Min) + ' minutes ago'; 

        // If the diff is less then milliseconds in a day 
    } else if (diff < ms_Day) { 
        return Math.round(diff / ms_Hour) + ' hours ago'; 

        // If the diff is less then milliseconds in a Month 
    } else if (diff < ms_Mon) { 
        return 'around ' + Math.round(diff / ms_Day) + ' days ago'; 

        // If the diff is less then milliseconds in a year 
    } else if (diff < ms_Yr) { 
        return 'around ' + Math.round(diff / ms_Mon) + ' months ago'; 
    } else { 
        return 'around ' + Math.round(diff / ms_Yr) + ' years ago'; 
    } 
} 
// TODO: Set time somewhere
const currentTime = new Date("2021-03-14 12:17:00")

    return (
      <div class="card mb-3">
        <div class="row g-0 " >
            <div class="col-md-4">
            <img src={snackpass_logo} alt="snackpass-logo" style={{"max-width": "170px"}} />
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">{order.itemName}</h5>
                <p>  ${order.price} </p>
                <p class="card-text badge bg-secondary"> {order.totalOrders} purchased recently  </p>
                <p class="card-text"><small class="text-muted">Last ordered {timeDiff(currentTime, new Date(order.mostRecentOrder))}</small></p>
            </div>
            </div>
        </div>
        </div>
        )
  }
  
export default Product;