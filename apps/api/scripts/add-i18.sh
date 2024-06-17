#!/bin/bash

key="$1"
default_value="${2:-}"

# Renk ve kalınlaştırma için ANSI kodları
RED='\033[0;31m'
GREEN='\033[0;32m'
BOLD='\033[1m'
RESET='\033[0m'

# Dilleri bir diziye koyalım
declare -a diller=("tr" "en" "nl")

# Eğer default_value boş ise anahtarları ve değerleri görüntüleyelim
if [ -z "$default_value" ]; then
    for dil in "${diller[@]}" ; do
        dosya="packages/ui/public/locales/${dil}/common.json"
        
        # Dosya var mı kontrol edelim
        if [[ -f "$dosya" ]]; then
            echo ""
            echo -e "${BOLD}> Processing file: ${GREEN}$dosya${RESET}"
            echo "------------------"
            # jq kullanarak key'i büyük küçük harfe duyarsız olarak içeren değerleri bulalım ve key=value şeklinde yazdıralım
            jq -r --arg key "$key" 'to_entries | map(select(.key | test($key; "i"))) | .[] | "\(.key)=\(.value)"' "$dosya" | while IFS= read -r line; do
                # echo -e ile doğrudan değiştirelim
                echo -e "${line//$key/${RED}${BOLD}${key}${RESET}}"
            done
        fi
    done
else
    # Her bir dil için işlemi tekrarlayalım
    for dil in "${diller[@]}" ; do
        dosya="packages/ui/public/locales/${dil}/common.json"
        
        # Dosya var mı kontrol edelim, yoksa oluşturalım.
        [[ -f "$dosya" ]] || touch "$dosya"
        
        echo -e "${BOLD}> Processing file: ${GREEN}$dosya${RESET}"
        
        jq --arg key "$key" --arg value "$default_value" \
        '. + { ($key): $value }' "$dosya" > "$dosya.tmp" && mv "$dosya.tmp" "$dosya"
    done
fi
