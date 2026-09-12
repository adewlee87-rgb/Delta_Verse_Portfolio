from bs4 import BeautifulSoup

with open('marvlus_dom.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

def print_element(el, name):
    if el:
        print(f"--- {name} ---")
        print(f"Classes: {el.get('class')}")
        # Print first few children's tags and classes
        for child in el.find_all(recursive=False):
            if child.name:
                print(f"  {child.name}: {child.get('class')}")
    else:
        print(f"--- {name} NOT FOUND ---")

# Try to find header (nav)
header = soup.find('nav') or soup.find('header')
print_element(header, "Header/Nav")

# Find sections
sections = soup.find_all('section')
for i, sec in enumerate(sections):
    print(f"\n--- Section {i+1} ---")
    print(f"ID: {sec.get('id')}")
    print(f"Classes: {sec.get('class')}")
    # find h1, h2 inside
    h1 = sec.find('h1')
    if h1: print(f"  H1 Classes: {h1.get('class')}")
    h2 = sec.find('h2')
    if h2: print(f"  H2 Classes: {h2.get('class')}")
    
    # Let's see some inner divs to get the bento/grid layout
    divs = sec.find_all('div', recursive=False)
    for div in divs:
        print(f"  Div Classes: {div.get('class')}")
        for inner in div.find_all('div', recursive=False):
            print(f"    Inner Div: {inner.get('class')}")
            
