#!/bin/bash  

key="$1"  
default_value="${2:-}"  

# ANSI codes for color and bold  
RED='\033[0;31m'  
GREEN='\033[0;32m'  
BOLD='\033[1m'  
RESET='\033[0m'  

# Put the languages into an array  
declare -a languages=("tr" "en" "nl")  

# If default_value is empty, let's display the keys and values  
if [ -z "$default_value" ]; then  
    for lang in "${languages[@]}" ; do  
        file="packages/ui/public/locales/${lang}/common.json"  
        
        # Check if the file exists  
        if [[ -f "$file" ]]; then  
            echo ""  
            echo -e "${BOLD}> Processing file: ${GREEN}$file${RESET}"  
            echo "------------------"  
            # Find the values containing the key case-insensitively using jq and print them in key=value format  
            jq -r --arg key "$key" 'to_entries | map(select(.key | test($key; "i"))) | .[] | "\(.key)=\(.value)"' "$file" | while IFS= read -r line; do  
                # Let's directly replace with echo -e  
                echo -e "${line//$key/${RED}${BOLD}${key}${RESET}}"  
            done  
        fi  
    done  
else  
    # Repeat the process for each language  
    for lang in "${languages[@]}" ; do  
        file="packages/ui/public/locales/${lang}/common.json"  
        
        # Check if the file exists, if not, let's create it.  
        [[ -f "$file" ]] || touch "$file"  
        
        echo -e "${BOLD}> Processing file: ${GREEN}$file${RESET}"  
        
        jq --arg key "$key" --arg value "$default_value" '. + { ($key): $value }' "$file" > "$file.tmp" && mv "$file.tmp" "$file"  
    done  
fi  
