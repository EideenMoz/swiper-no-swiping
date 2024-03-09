import re
import os
import requests
import json
import datetime
from bs4 import BeautifulSoup
from unidecode import unidecode

def condense_whitespace(input_text):
    # Change whitespace so that each line is simply a dining hall and whatnot
    condensed_text = re.sub(r'(Contains.*|Prepared.*|Vegan Menu Option|Vegetarian Menu Option|Halal Menu Option|Low Carbon Footprint)|', '', input_text)
    condensed_text = re.sub(r' {2,}', ' ', input_text)
    condensed_text = re.sub(r'\n{3,}', '\n\n', condensed_text)
    condensed_text = re.sub(r'([^\S\n])\s+', r'\1', condensed_text)
    
    return condensed_text
    
def clean_menu(menu_string):
    # Removed menu's sublocation
    words_to_remove = ['Capri', 'Mezze', 'Flex', 'bar', 'Psistaria', 'Alimenti', 
                       'Kitchen', 'The Pizzeria', 'Grill', 'Freshly', 'Bowled', 
                       'Harvest', 'Stone', 'Oven', 'Simply', 'Grilled']
    
    lines = menu_string.split('\n')
    cleaned_lines = []
    for line in lines: #removing extraneous information
        if not any(phrase in line for phrase in ['Vegan Menu Option', 'Vegetarian Menu Option', 'Halal Menu Option', 'Low Carbon Footprint', 'Prepared', 'Detailed Menu' , 'Activity Level']) and 'Contains' not in line:
            cleaned_line = ' '.join(word for word in line.split() if not any(remove_word in word for remove_word in words_to_remove))
            cleaned_lines.append(cleaned_line)
    
    cleaned_menu = '\n'.join(' '.join(word.capitalize() for word in line.strip().split()) for line in cleaned_lines if line.strip())
    
    return cleaned_menu

def fetch_menu_items_html(date): #should be pretty obvious
    url = f'https://menu.dining.ucla.edu/Menus/{date}/'
    response = requests.get(url)
    if response.status_code == 200:
        return response.content
    else:
        print(f"Failed to fetch menu for {date}")
        return None

def parse_menu_items(html_content):
    soup = BeautifulSoup(html_content, 'lxml')
    allMenus = []
    h2Tags = soup.find_all('h2', id='page-header')

    for i in range(3):
        if h2Tags and i < len(h2Tags):
            for sibling in h2Tags[i].find_next_siblings():
                if sibling.name == 'h2' or sibling.name == 'hr':
                    break
                allMenus.append(sibling)

    menu_map = {'Epicuria': {'Breakfast': [], 'Lunch': [], 'Dinner': []},
                'De Neve': {'Breakfast': [], 'Lunch': [], 'Dinner': []},
                'Bruin Plate': {'Breakfast': [], 'Lunch': [], 'Dinner': []}}

    current_hall = None
    current_meal = None

    for menu in allMenus:
        text_menu = unidecode(menu.text.strip())
        no_whitespace_menu = condense_whitespace(text_menu)
        clean_menu_text = clean_menu(no_whitespace_menu)
        
        lines = clean_menu_text.split('\n')
        
        for line in lines:
            if 'Detailed Breakfast Menu' in line:
                current_meal = 'Breakfast'
                continue
            elif 'Detailed Lunch Menu' in line:
                current_meal = 'Lunch'
                continue
            elif 'Detailed Dinner Menu' in line:
                current_meal = 'Dinner'
                continue
            
            hall_name = line.strip()
            if hall_name in menu_map:
                current_hall = hall_name
            elif current_meal and current_hall:
                menu_items = line.split(',')
                menu_map[current_hall][current_meal].extend(menu_items)

    return menu_map


def write_menu_to_json(menu_data, date):
    formatted_menus = {
        "Breakfast": {},
        "Lunch": {},
        "Dinner": {}
    }
    
    for hall_name, menu in menu_data.items():
        formatted_menus["Breakfast"][hall_name] = menu["Breakfast"]
        formatted_menus["Lunch"][hall_name] = menu["Lunch"]
        formatted_menus["Dinner"][hall_name] = menu["Dinner"]

    # Format the date for the filename
    formatted_date = date.strftime("%Y-%m-%d")

    # Create the directory if it doesn't exist
    directory = "./ucla-swiper-planner/src/app/DailyMenu"
    if not os.path.exists(directory):
        os.makedirs(directory)

    # Write the menu data to a JSON file
    filename = os.path.join(directory, f"menu_{formatted_date}.json")
    with open(filename, 'w') as json_file:
        json.dump(formatted_menus, json_file, indent=4)

# Loop through the next 7 days
for i in range(7):
    deltaDay = datetime.date.today() + datetime.timedelta(days=i)
    html_content = fetch_menu_items_html(deltaDay)
    if html_content:
        try:
            menu_info = parse_menu_items(html_content) 
            write_menu_to_json(menu_info, deltaDay)
            print(f"Menu for {deltaDay} saved successfully.")
        except Exception as e:
            print(f"Error processing menu for {deltaDay}: {e}")
    else:
        print(f"No menu content available for {deltaDay}.")