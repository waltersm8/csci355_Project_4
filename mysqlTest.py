import mysql.connector

"""
mydb = mysql.connector.connect(
  host="deltona.birdnest.org",
  user="my.ferneym2",
  passwd="max1well"
)
"""
#Actual Database    
mydb = mysql.connector.connect(
  host="deltona.birdnest.org",
  user="my.waltersm8",
  passwd="Swa3ugus",
  database="my_waltersm8_csci355Project4"
)

print(mydb)

mycursor = mydb.cursor()
print(mycursor)

print("===Showing Databases===")
mycursor.execute("SHOW DATABASES")

for x in mycursor:
    print(x)

print("===Showing Tables===")
mycursor.execute("SHOW TABLES")