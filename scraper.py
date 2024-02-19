import json
import requests
import datetime
import os
from bs4 import BeautifulSoup
from unidecode import unidecode

# Gets us html from date in formal yr-mon-day
def fetch_menu_html(date):
    url = f"https://menu.dining.ucla.edu/hours/{date}/" #this is the format of ucla website
    response = requests.get(url) #gets a request for the html
    
    if response.status_code == 200: #good code
        return response.content
    else:
        return None

def parse_menu_html(html_content):
    soup = BeautifulSoup(html_content, 'lxml') #start up the Jawn on the html of the whole page
    
    datesMenu= {}

    table = soup.find('table', class_='hours-table') #focus on the table with all the hours
    
    if table:   #only run if we find a table (should always unless something rlly weird happens)
        tempGuy = table.find('tbody')  #go inside of tbody to then be right above all the table rows
        locations = tempGuy.find_all('tr') #each tr represents one location, and we put them in an list called locations to iterate through
        
        for location in locations: 
            curLocation= {}
            location_name = unidecode(location.find('span', class_='hours-location').text.strip()) # Use unidecode to convert accented characters to ASCII
            realHours=location.find_all('td')[1:] #gets every other data cell than the first, as the location was the first
            hours = [td.text.strip() for td in realHours] #strips it so we only get the text and adds it to realHours, which represents the hours for each location

            if(len(hours)==1):
                curLocation = {location_name: "Closed"}
            else:
                curLocation = {location_name: hours}
            datesMenu.update(curLocation)
                
        return  datesMenu
    else:
        print("Failed to find table ):")
        return None

def save_menu_to_json(menu_info, date):
    directory = "Menus"
    filename = f"menu_{date}.json"
    
    if not os.path.exists(directory):
        os.makedirs(directory)

    filepath = os.path.join(directory, filename)
   
    with open(filepath, 'w') as json_file:
        json.dump(menu_info, json_file, indent=4)  
    
    print(f"Menu information saved to {filepath}")


today = datetime.date.today() #gets the data obviously
html_content = fetch_menu_html(today) #gets the menu for today

for i in range (14): #gets the menus for the following i days
    deltaDay = datetime.date.today() + datetime.timedelta(days=i)
    html_content = fetch_menu_html(deltaDay)
    if html_content:
        menu_info = parse_menu_html(html_content) 
        if menu_info:
       #save all the shit for today in a Json
            save_menu_to_json(menu_info, deltaDay)
    else:
        print("Couldn't get HTML ):")
