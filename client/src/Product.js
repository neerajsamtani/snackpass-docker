import snackpass_logo from './assets/snackpass-logo.png'

const Product = ({ order }) => {

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

const currentTime = new Date()

    return (
      <div className="card mb-3">
        <div className="row g-0 " >
            <div className="col-md-4">
            <img src={snackpass_logo} alt="snackpass-logo" style={{"maxWidth": "170px"}} />
            </div>
            <div className="col-md-8">
            <div className="card-body">
                <h5 className="card-title">{order.itemName}</h5>
                <p>  ${order.price} </p>
                <p className="card-text badge bg-secondary"> {order.totalRecentOrders} purchased recently  </p>
                {console.log(order)}
                <p className="card-text"><small className="text-muted">Last ordered {timeDiff(currentTime, new Date(order.mostRecentOrder))}</small></p>
            </div>
            </div>
        </div>
        </div>
        )
  }
  
export default Product;