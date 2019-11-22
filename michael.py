import mysql.connector

mysql = mysql.connector

#Actual Database    
mydb = mysql.connect(
  host="127.0.0.1",
  user="root",
  passwd="admin",
  database="362project4"
)

print("Connected to database")


def main():
  while True:
    print("""
    =========================================
    
    =========================================
    """)

  #command = input("Input Value")