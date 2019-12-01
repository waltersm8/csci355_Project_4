
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



def main():
  while True:
    print("""\n\n\n\n\n
    =========================================
    What would you like to do? 
    (press the number by which one you'd like to do)
    1) Create a value on the table
    2) Read the table or tables
    3) Update a value in the database
    4) Delete a value in the database
    
    Press ctrl+c to exit or press 5
    =========================================
    """)

    
    try:
      command=None
      selection = int(input("Input Value: "))
      if selection==1:
        print("create")
        command='create'
      elif selection==2:
        print("read")
        command='read'
      elif selection==3:
        print("update")
        command='update'
      elif selection==4:
        print("delete")
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
      input()
      ###---CREATE---###
      if command=='create':
        # Show tables
        print("===Showing Tables===")
        mycursor.execute("SHOW TABLES")

        myresult = mycursor.fetchall()
        for x in myresult:
          print(x)

        print("Which table would you like to insert into?")
        tableSelection = input("Table Name: ")
        if tableSelection == 'GENRE':
          val1 = input("genre: ")
          sql = "INSERT INTO "+tableSelection+" (genre) VALUES ("+val1+")"
        elif tableSelection == 'DEVELOPER':
          val1 = input("name: ")
          sql = "INSERT INTO "+tableSelection+" (name) VALUES ("+val1+")"
        elif tableSelection == 'GAME':
          val1 = input("title: ")
          val2 = input("developer id: ")
          val3 = input("genre id: ")
          val4 = input("ageLimit: ")
          if val4 == '':
            sql = "INSERT INTO "+tableSelection+" (title, developer, genre) VALUES ("+val1+", "+val2+", "+val3+")"
          else:
            sql = "INSERT INTO "+tableSelection+" (title, developer, genre, ageLimit) VALUES ("+val1+", "+val2+", "+val3+", "+val4+")"
        
        mycursor.execute(sql)

        myresult = mycursor.fetchall()
        for x in myresult:
          print(x)

          


      ###---READ---###
      elif command=='read':  
        # Show tables
        print("===Showing Tables===")
        mycursor.execute("SHOW TABLES")

        myresult = mycursor.fetchall()
        for x in myresult:
          print(x)

        #select table
        tableSelection = input("please input table name: ")
        
        #show table
        mycursor.execute("SELECT * from "+tableSelection+";")
        myresult = mycursor.fetchall()
        for x in myresult:
          print(x)
        

        





main()