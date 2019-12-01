
import mysql.connector
import time


mydb = mysql.connector.connect(
  host="deltona.birdnest.org",
  user="my.ferneym2",
  passwd="max1well",
  database="my_ferneym2_355_p4_test"
)


# #Actual Database    
# mydb = mysql.connector.connect(
#   host="deltona.birdnest.org",
#   user="my.waltersm8",
#   passwd="Swa3ugus",
#   database="my_waltersm8_csci355Project4"
# )

print(mydb)

mycursor = mydb.cursor()
print(mycursor)

print("===Showing Databases===")
mycursor.execute("SHOW DATABASES")

for x in mycursor:
    print(x)

print("===Showing Tables===")
mycursor.execute("SHOW TABLES")

myresult = mycursor.fetchall()
for x in myresult:
  print(x)



def main():
  while True:
    print("""\n\n\n
    =========================================
    What would you like to do? 
    (press the number by which one you'd like to do)
    1) Create a value on the USER table
    2) Read the USER table
    3) Update a value in the USER table
    4) Delete a value in the USER table
    
    Press ctrl+c to exit or press 5
    =========================================
    """)

    
    try:
      command=None
      selection = int(input("Input Value: "))
      if selection==1:
        command='create'
      elif selection==2:
        command='read'
      elif selection==3:
        command='update'
      elif selection==4:
        command='delete'
      elif selection==5:
        print("Goodbye. Type main() to start again")
        return None
      else:
        command=None
        print("\n\n--------------ERROR--------------")
        print("Please enter a valid input")
    except ValueError:
      print("\n\n--------------ERROR--------------")
      print("Can only input a number. Please try again")
    except KeyboardInterrupt:
      print("\n\n--------------ERROR--------------")
      print("Goodbye. Type main() to start again")
      return None

    
    if command==None:
      print()
    else:
      print(command)
      ###---CREATE---###
      if command=='create':
        val1 = input("userName: ")
        val2 = input("fName: ")
        val3 = input("lName: ")
        #val4 = input("birthdate: ")
        # if val3 == '':
        #   sql = "INSERT INTO USER (userName, fName, birthdate) VALUES (\""+val1+"\", \""+val2+"\", "+val4+")"
        # elif val4 == '' and val3 != '':
        #   sql = "INSERT INTO USER (userName, fName, lName) VALUES (\""+val1+"\", \""+val2+"\", \""+val3+"\")"
        if val3 =='':# and val4 == '':
          sql = "INSERT INTO USER (userName, fName) VALUES (\""+val1+"\", \""+val2+"\")"
        else:
          sql = "INSERT INTO USER (userName, fName, lName) VALUES (\""+val1+"\", \""+val2+"\", \""+val3+"\")"
        # else:
        #   sql = "INSERT INTO USER (userName, fName, lName, birthdate) VALUES (\""+val1+"\", \""+val2+"\", \""+val3+"\", "+val4+")"
        print(sql)
        mycursor.execute(sql)
        mydb.commit()


      ###---READ---###
      if command == 'read':
        mycursor.execute("SELECT * from USER")
        myresult = mycursor
        for x in myresult:
          print(x)
        
      ###---UPDATE---###
      if command == 'update':
        print("(userName, fName, lName)")
        columnName = input("input Column Name of value to be changed: ")
        oldVal = input("old value: ")
        newVal = input("new value: ")
        sql = "UPDATE USER SET "+columnName+" = '"+newVal+"' WHERE "+columnName+" = '"+oldVal+"'"
        mycursor.execute(sql)
        print(mycursor)
        mydb.commit()
      
      ###---DELETE---###
      if command == 'delete':
        print("(userName, fName, lName)")
        columnName = input("input column name to check value to be deleted: ")
        val = input("input value of row to be deleted: ")
        confirm = input("ARE YOU SURE? (y/n)")
        if confirm.lower() == 'y':
          sql = "DELETE FROM USER WHERE "+columnName+" = '"+val+"'"
          mycursor.execute(sql)
          mydb.commit()
          print(mycursor.rowcount, "record(s) deleted")
        else:
          print("Nothing was Deleted")
        
        




main()