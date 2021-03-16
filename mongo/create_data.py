import numpy as np
import random
import datetime
import csv

def generate_random_time():
    random_day = 13 - random.randint(0, 3)
    # Generate peaks around noon and 9pm, relating to lunch and dinner
    if random.random() < 0.5:
        date = datetime.datetime(2021, 3, random_day, 12, 0)
    else:
        date = datetime.datetime(2021, 3, random_day, 21, 0)
    
    time_offset = np.random.normal(loc=0, scale=240)
    final_date = date + datetime.timedelta(minutes=time_offset)

    return final_date.strftime("%Y-%m-%d %H:%M:%S")

orderTimeDict = {}

readCSVFile = open("orders.csv", newline='')
writeCSVFile = open("ordersWithTime.csv", 'w+', newline='')
reader = csv.reader(readCSVFile, delimiter=',')
writer = csv.writer(writeCSVFile, delimiter=',')

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