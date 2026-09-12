import urllib.request

url = "https://icon.horse/icon/lenis.studiofreight.com"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        with open("public/icons/lenis.png", "wb") as f:
            f.write(response.read())
        print("lenis saved")
except Exception as e:
    print(e)
