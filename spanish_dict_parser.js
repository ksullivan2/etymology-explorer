import json
import xml.etree.ElementTree as ET

tree = ET.parse("spanish_dict_xml.txt")
root = tree.getroot()

noun_to_gender = {}
FEMININE = "Fem"
MASCULINE = "Masc"
EITHER = "MascFem"

for element in root:
    for word in element:
        word_type = [e for e in word if e.tag == "t"]
        if not word_type:
            continue
        word_type = word_type[0]
        if not word_type.text.startswith("{n}"):
            continue
        noun = [e for e in word if e.tag == "d"]
        if not noun or noun[0].text is None:
            continue
        entries = noun[0].text.split()
        for i in range(len(entries)):
            if entries[i] == "{m}" and i > 0:
                if i < len(entries) - 1 and entries[i + 1] == "{f}":
                    noun_to_gender[entries[i-1]] = EITHER
                else:
                    noun_to_gender[entries[i-1]] = MASCULINE
            if entries[i] == "{f}" and i > 0:
                noun_to_gender[entries[i-1]] = FEMININE

file_contents = json.dumps(noun_to_gender)
with open("spanish_dict.json", "w") as f:
    f.write(file_contents)