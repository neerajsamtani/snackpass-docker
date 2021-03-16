import numpy as np
import random
import datetime
import csv

def generate_random_time():
    # Create data for the past 3 days
    today = datetime.datetime.now()
    random_day = int(today.strftime('%d')) - random.randint(0, 2)
    this_month = int(today.strftime('%m'))
    this_year = int(today.strftime('%Y'))
    # Generate peaks around noon and 9pm, relating to lunch and dinner
    if random.random() < 0.5:
        date = datetime.datetime(this_year, this_month, random_day, 12, 0)
    else:
        date = datetime.datetime(this_year, this_month, random_day, 21, 0)
    
    time_offset = np.random.normal(loc=0, scale=180)
    final_date = date + datetime.timedelta(minutes=time_offset)

    # Store time in ISO Date Format
    return final_date.strftime("%Y-%m-%dT%H:%M:%SZ")

orderTimeDict = {}

# We read and write CSV files
readCSVFile = open("orders.csv", newline='')
writeCSVFile = open("ordersWithTime.csv", 'w+', newline='')
reader = csv.reader(readCSVFile, delimiter=',')
writer = csv.writer(writeCSVFile, delimiter=',')

# The first row is the header, so we simply append a title
row1 = next(reader)
row1.append("Order Time")
writer.writerow(row1)

# Append a random time to each row
for row in reader:
    orderId = row[0]
    if orderId in orderTimeDict:
        row.append(orderTimeDict[orderId])
    else:
        random_time = generate_random_time()
        orderTimeDict[orderId] = random_time
        row.append(random_time)
    writer.writerow(row)

readCSVFile.close()
writeCSVFile.close()