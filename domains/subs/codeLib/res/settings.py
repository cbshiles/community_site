from __future__ import print_function
import sys

def eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)
	
def equit(*args, **kwargs):
	eprint(*args, **kwargs)
	sys.exit(0)
			
class Settings:
	def __init__(self, default, strict=True):
		self.dict = default		
		if strict:
			self.errFn = equit
		else:
			self.errFn = eprint
			
	def addPair(self, key, val):
		if key in self.dict:
			self.dict[key] = val
		else:
			self.errFn("Error: key '"+key+"' not found in settings.")
			
	def addFile(self, fname):
		with open (fname, "r") as pfile:
			for line in pfile.readlines():
				kv = line.split("=", 1)
				if len(kv) == 2:
					self.addPair(kv[0].strip(), kv[1].strip())
				else:
					self.errFn("Error: No key value pair in: "+line)
				
x = Settings({'animal': 'cat', 'toy': 'yarn', 'food': 'chicken'})
x.addFile('props.txt')
print(x.dict)
  