import random
import string
from time import sleep
import requests

def createCode() -> str:
	return "".join(random.SystemRandom().choices(string.digits, k = 32))

def verifyCode(username: str, code: str) -> bool:
  cloudData = requests.get("https://clouddata.scratch.mit.edu/logs", params = {"projectid": 440710593, "limit": 1000, "offset": 0}).json()

  for entry in cloudData:
    if (entry["verb"] == "set_var" and entry["name"] == "☁ Verification code" and entry["user"] == username):
      # print(entry)
      if entry['value'] == code: 
        return True
      else:
        return False
  return False

if __name__ == "__main__":
  uname = str(input("What username do you want to check for? "))
  vcode = createCode()
  print("Your code is:", str(vcode), "\nWaiting for you to enter the code in the project...")
  done = False
  while not done:
    done = verifyCode(uname, vcode)
    if not done:
      sleep(0.5)
  print("Verified!")
