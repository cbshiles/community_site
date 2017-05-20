class Line:
	#assumes input between 6 and 9 inclusive
	def __init__(self, n):
		self.yin = (n%2 == 0)
		self.changing = (n == 6 or n == 9)
		
		if n==6:
			self.char = 'X'
		elif n==7:
			self.char = '-'
		elif n==8:
			self.char = ' '
		elif n==9:
			self.char = 'O'
		
	def toString(self):
		return '-'+self.char+'-'
id=[]		
with open('hex_map.t') as f:
	for ln in f.readlines():
		id += [int(z) for z in ln.rstrip().split('	')[::-1]]

def getID(hex):
	m = 64
	n = 0
	for line in hex:
		m //= 2
		if not line.yin:
			n += m
	return id.index(n)+1
	
import random			
def Ancient_Yarrow():
	random.seed()	
	remain = 0
	
	def  divide(x):
		nonlocal remain
		
		right = random.randint(2, x-1)
		left = x - right
		right -= 1
		
		z = 1 + reduce(right) + reduce(left)
		if z == 4 or z == 5:
			return 3
		elif z == 8 or z==9:
			return 2
		else:
			raise Exception("Bad stick count! - "+str(z))
		
	def reduce(x):
		nonlocal remain
		while x > 4:
			remain += 4
			x -= 4
		return x
	
	lzt = []
	for x in range(0,6):
		lzt.append(Line(divide(50-1) + divide(remain) + divide(remain)))
		remain = 0
	return lzt
	
#re.search('[0-9]+-[0-9]+', "isaace asi54-32move's dinner parties")


#import os

#f = []
#for (dirpath, dirnames, filenames) in os.walk(mypath):
#    f.extend(filenames)
#    break

def print_hex(hex):
	for x in range(0,6):
		print(hex[5-x].toString())

#for k in range(0,100000):
#	Ancient_Yarrow()		
hex = Ancient_Yarrow()
print_hex(hex)
print (getID(hex))
#print(lzzt)