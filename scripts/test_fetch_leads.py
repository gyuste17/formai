import urllib.request
import json

url = "https://script.google.com/macros/s/AKfycbxkr3IiqKFK5IIRDc-keYnjNR_yqmtPIAfRN56I2QBNvU6vFfX-40Uv2PYjgNt1pDMm/exec?action=getLeads"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
try:
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        print("Success:", data.get("success"))
        leads = data.get("leads", [])
        print("Total leads fetched:", len(leads))
        emails = {}
        for l in leads:
            email = (l.get("email") or "").lower().strip()
            emails[email] = emails.get(email, 0) + 1
            print(f"ID: {l.get('id')} | Email: {l.get('email')} | Name: {l.get('name')} | Company: {l.get('company')} | Date: {l.get('date')} | Status: {l.get('status')}")
            
        print("\n--- DUPLICATE EMAILS COUNT ---")
        for em, count in emails.items():
            if count > 1 and em:
                print(f"Duplicate ({count}x): {em}")
except Exception as e:
    print("Error:", e)
