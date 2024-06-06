#!/bin/bash

key="$1"
default_value="${2:-$key}"

# Dilleri bir diziye koyalım
declare -a diller=("tr" "en" "nl")

# Her bir dil için işlemi tekrarlayalım
for dil in "${diller[@]}" ; do
  dosya="packages/ui/public/locales/${dil}/common.json"

  # Dosya var mı kontrol edelim, yoksa oluşturalım.
  [[ -f "$dosya" ]] || touch "$dosya"

  # jq kullanarak anahtarı ve değeri ekleyelim
  jq --arg key "$key" --arg value "$default_value" '. + { ($key): $value }' "$dosya" > "$dosya.tmp" && mv "$dosya.tmp" "$dosya" 
done
