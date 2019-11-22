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
  host="127.0.0.1",
  user="root",
  passwd="",
  database="362project4"
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



def main():
  while True:
    print("""
    =========================================
    
    =========================================
    """)

    command = input("Input Value")